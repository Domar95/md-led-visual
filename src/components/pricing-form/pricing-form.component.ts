import { Component } from '@angular/core';
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
export class PricingFormComponent {
  pricingForm = new FormGroup({
    place: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.warn(this.pricingForm.value);
  }
}
