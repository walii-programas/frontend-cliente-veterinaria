import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetVaccinationCardsComponent } from './pet-vaccination-cards.component';

describe('PetVaccinationCardsComponent', () => {
  let component: PetVaccinationCardsComponent;
  let fixture: ComponentFixture<PetVaccinationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetVaccinationCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetVaccinationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
