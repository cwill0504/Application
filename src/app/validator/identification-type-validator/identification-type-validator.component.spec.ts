import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationTypeValidatorComponent } from './identification-type-validator.component';

describe('IdentificationTypeValidatorComponent', () => {
  let component: IdentificationTypeValidatorComponent;
  let fixture: ComponentFixture<IdentificationTypeValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificationTypeValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationTypeValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
