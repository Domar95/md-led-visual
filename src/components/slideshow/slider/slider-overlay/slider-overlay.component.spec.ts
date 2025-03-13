import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderOverlayComponent } from './slider-overlay.component';

describe('SliderOverlayComponent', () => {
  let component: SliderOverlayComponent;
  let fixture: ComponentFixture<SliderOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
