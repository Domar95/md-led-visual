import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { startWith, Subscription } from 'rxjs';

interface PricingOption {
  value: string;
  label: string;
  // added to the base price when selected
  price: number;
}

const BASE_PRICE = 500;

@Component({
  selector: 'mdlv-pricing-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './pricing-form.component.html',
  styleUrl: './pricing-form.component.scss',
  animations: [
    trigger('priceChange', [
      transition(':increment, :decrement', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate(
          '350ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ],
})
export class PricingFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('summary') summaryRef?: ElementRef<HTMLElement>;
  /** The full summary is on screen, so the phone price bar steps aside */
  summaryInView = signal(false);
  private summaryObserver?: IntersectionObserver;

  placeOptions: PricingOption[] = [
    { value: 'inside', label: 'Wewnątrz', price: 0 },
    { value: 'outside', label: 'Na zewnątrz', price: 500 },
  ];
  categoryOptions: PricingOption[] = [
    {
      value: 'company',
      label: 'Impreza firmowa',
      price: 0,
    },
    {
      value: 'private',
      label: 'Impreza prywatna',
      price: 0,
    },
    {
      value: 'outdoor',
      label: 'Impreza plenerowa',
      price: 0,
    },
    {
      value: 'presentation',
      label: 'Prezentacja',
      price: 0,
    },
  ];
  sizeOptions: PricingOption[] = [
    { value: '1x6', label: '1x6', price: 0 },
    { value: '2x6', label: '2x6', price: 200 },
    { value: '3x6', label: '3x6', price: 400 },
  ];

  pricingForm = new FormGroup({
    place: new FormControl('inside', { nonNullable: true }),
    category: new FormControl('company', { nonNullable: true }),
    size: new FormControl('1x6', { nonNullable: true }),
  });
  // row names in the summary, in the order of selectedOptions
  summaryLabels = ['Miejsce', 'Rodzaj', 'Ekran'];
  price = BASE_PRICE;
  private pricingFormSubscription!: Subscription;

  ngOnInit(): void {
    this.pricingFormSubscription = this.pricingForm.valueChanges
      .pipe(startWith(this.pricingForm.value))
      .subscribe(() => {
        this.price = this.calculatePrice();
      });
  }

  calculatePrice(): number {
    return this.selectedOptions.reduce(
      (price, option) => price + option.price,
      BASE_PRICE
    );
  }

  get selectedOptions(): PricingOption[] {
    const { place, category, size } = this.pricingForm.getRawValue();

    return [
      this.findOption(this.placeOptions, place),
      this.findOption(this.categoryOptions, category),
      this.findOption(this.sizeOptions, size),
    ];
  }

  // prefills the contact form with the chosen configuration
  get inquiryMessage(): string {
    const [place, category, size] = this.selectedOptions;

    return `Dzień dobry, interesuje mnie ekran ${size.label} (${place.label.toLowerCase()}, ${category.label.toLowerCase()}). Orientacyjny koszt z kalkulatora: ${this.price} zł.`;
  }

  // "2x6" is drawn 6 wide and 2 high
  screenRatio(option: PricingOption): string {
    const [height, width] = option.value.split('x');
    return `${width} / ${height}`;
  }

  ngAfterViewInit(): void {
    const summary = this.summaryRef?.nativeElement;
    if (!summary || !('IntersectionObserver' in window)) return;

    this.summaryObserver = new IntersectionObserver(([entry]) =>
      this.summaryInView.set(entry.isIntersecting)
    );
    this.summaryObserver.observe(summary);
  }

  ngOnDestroy(): void {
    this.summaryObserver?.disconnect();
    this.pricingFormSubscription?.unsubscribe();
  }

  private findOption(options: PricingOption[], value: string): PricingOption {
    return options.find((option) => option.value === value) ?? options[0];
  }
}
