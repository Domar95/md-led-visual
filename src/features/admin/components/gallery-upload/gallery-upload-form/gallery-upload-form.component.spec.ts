import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryUploadFormComponent } from './gallery-upload-form.component';

describe('GalleryUploadFormComponent', () => {
  let component: GalleryUploadFormComponent;
  let fixture: ComponentFixture<GalleryUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryUploadFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
