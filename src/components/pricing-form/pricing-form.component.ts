import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { startWith, Subscription } from 'rxjs';

@Component({
  selector: 'mdlv-pricing-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
  ],
  templateUrl: './pricing-form.component.html',
  styleUrl: './pricing-form.component.scss',
})
export class PricingFormComponent implements OnInit {
  pricingForm = new FormGroup({
    place: new FormControl('inside', Validators.required),
    category: new FormControl('company', Validators.required),
    size: new FormControl('1x6', Validators.required),
  });
  price = 0;
  private pricingFormSubscription!: Subscription;

  ngOnInit(): void {
    this.pricingForm.valueChanges
      .pipe(startWith(this.pricingForm.value))
      .subscribe((formValues) => {
        this.price = this.calculatePrice(formValues);
      });
  }

  calculatePrice(
    values: Partial<{
      place: string | null;
      category: string | null;
      size: string | null;
    }>
  ): number {
    let basePrice = 500;
    console.log(values);

    if (values.place === 'outside') {
      basePrice += 500;
    }

    if (values.size === '2x6') {
      basePrice += 200;
    }
    if (values.size === '3x6') {
      basePrice += 400;
    }

    return basePrice;
  }

  ngOnDestroy(): void {
    if (this.pricingFormSubscription) {
      this.pricingFormSubscription.unsubscribe();
    }
  }
}
