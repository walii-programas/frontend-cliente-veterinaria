import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSimpleServicesComponent } from './pet-simple-services.component';

describe('PetSimpleServicesComponent', () => {
  let component: PetSimpleServicesComponent;
  let fixture: ComponentFixture<PetSimpleServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetSimpleServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSimpleServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
