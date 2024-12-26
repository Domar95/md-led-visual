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
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mdlv-pricing-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './pricing-form.component.html',
  styleUrl: './pricing-form.component.scss',
})
export class PricingFormComponent implements OnInit {
  pricingForm = new FormGroup({
    place: new FormControl('outside', Validators.required),
    category: new FormControl('outdoor', Validators.required),
    size: new FormControl('1x6', Validators.required),
  });

  price = 0;

  ngOnInit(): void {
    this.price = this.calculatePrice(this.pricingForm.value);
  }

  onSubmit() {
    const formValues = this.pricingForm.value;
    this.price = this.calculatePrice(formValues);
    console.warn(this.price);
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
}
