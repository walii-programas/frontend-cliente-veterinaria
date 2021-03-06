import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnvaccinatedVaccinesComponent } from './unvaccinated-vaccines.component';

describe('UnvaccinatedVaccinesComponent', () => {
  let component: UnvaccinatedVaccinesComponent;
  let fixture: ComponentFixture<UnvaccinatedVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnvaccinatedVaccinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnvaccinatedVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
