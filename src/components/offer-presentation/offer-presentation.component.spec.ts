import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPresentationComponent } from './offer-presentation.component';

describe('OfferPresentationComponent', () => {
  let component: OfferPresentationComponent;
  let fixture: ComponentFixture<OfferPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
