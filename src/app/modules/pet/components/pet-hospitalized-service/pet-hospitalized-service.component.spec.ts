import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetHospitalizedServiceComponent } from './pet-hospitalized-service.component';

describe('PetHospitalizedServiceComponent', () => {
  let component: PetHospitalizedServiceComponent;
  let fixture: ComponentFixture<PetHospitalizedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetHospitalizedServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetHospitalizedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
