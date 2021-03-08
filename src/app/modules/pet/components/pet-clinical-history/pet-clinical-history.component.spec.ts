import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetClinicalHistoryComponent } from './pet-clinical-history.component';

describe('PetClinicalHistoryComponent', () => {
  let component: PetClinicalHistoryComponent;
  let fixture: ComponentFixture<PetClinicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetClinicalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetClinicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
