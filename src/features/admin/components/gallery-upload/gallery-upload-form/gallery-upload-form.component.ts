import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'mdlv-gallery-upload-form',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './gallery-upload-form.component.html',
  styleUrl: './gallery-upload-form.component.scss',
})
export class GalleryUploadFormComponent {
  @Output() formSubmitted = new EventEmitter<{
    category: string;
    files: File[];
  }>();

  uploadForm = new FormGroup({
    category: new FormControl<string>('imprezy-firmowe', {
      nonNullable: true,
      validators: Validators.required,
    }),

    files: new FormControl<File[]>([], {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  categories: string[] = [
    'imprezy-firmowe',
    'imprezy-prywatne',
    'imprezy-plenerowe',
    'prezentacje',
  ];

  onSubmit(): void {
    if (this.uploadForm.invalid) return;
    this.formSubmitted.emit(this.uploadForm.getRawValue());
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    this.uploadForm.patchValue({ files: Array.from(input.files) });
  }
}
