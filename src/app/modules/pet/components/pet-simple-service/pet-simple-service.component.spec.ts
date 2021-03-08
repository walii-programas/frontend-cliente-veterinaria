import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSimpleServiceComponent } from './pet-simple-service.component';

describe('PetSimpleServiceComponent', () => {
  let component: PetSimpleServiceComponent;
  let fixture: ComponentFixture<PetSimpleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetSimpleServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSimpleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
