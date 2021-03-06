import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHospitalizedServicesComponent } from './pet-hospitalized-services.component';

describe('PetHospitalizedServicesComponent', () => {
  let component: PetHospitalizedServicesComponent;
  let fixture: ComponentFixture<PetHospitalizedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetHospitalizedServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHospitalizedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
