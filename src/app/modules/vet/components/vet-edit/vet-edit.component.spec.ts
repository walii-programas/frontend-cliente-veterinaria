import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetEditComponent } from './vet-edit.component';

describe('VetEditComponent', () => {
  let component: VetEditComponent;
  let fixture: ComponentFixture<VetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
