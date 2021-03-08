import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetVaccinationCardComponent } from './pet-vaccination-card.component';

describe('PetVaccinationCardComponent', () => {
  let component: PetVaccinationCardComponent;
  let fixture: ComponentFixture<PetVaccinationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetVaccinationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetVaccinationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
