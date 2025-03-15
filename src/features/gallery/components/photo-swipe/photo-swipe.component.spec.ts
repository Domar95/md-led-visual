import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSwipeComponent } from './photo-swipe.component';

describe('PhotoSwipeComponent', () => {
  let component: PhotoSwipeComponent;
  let fixture: ComponentFixture<PhotoSwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSwipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoSwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
