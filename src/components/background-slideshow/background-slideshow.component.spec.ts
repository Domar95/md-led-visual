import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundSlideshowComponent } from './background-slideshow.component';

describe('BackgroundSlideshowComponent', () => {
  let component: BackgroundSlideshowComponent;
  let fixture: ComponentFixture<BackgroundSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundSlideshowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
