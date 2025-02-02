import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPresentationGridsComponent } from './offer-presentation-grids.component';

describe('OfferPresentationGridsComponent', () => {
  let component: OfferPresentationGridsComponent;
  let fixture: ComponentFixture<OfferPresentationGridsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferPresentationGridsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferPresentationGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
