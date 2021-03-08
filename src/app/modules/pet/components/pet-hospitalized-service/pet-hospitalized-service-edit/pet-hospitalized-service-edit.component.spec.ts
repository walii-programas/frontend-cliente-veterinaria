import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHospitalizedServiceEditComponent } from './pet-hospitalized-service-edit.component';

describe('PetHospitalizedServiceEditComponent', () => {
  let component: PetHospitalizedServiceEditComponent;
  let fixture: ComponentFixture<PetHospitalizedServiceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetHospitalizedServiceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHospitalizedServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
