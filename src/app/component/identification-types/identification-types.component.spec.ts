import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { IdentificationTypesComponent } from './identification-types.component';

describe('IdentificationTypesComponent', () => {
  let component: IdentificationTypesComponent;
  let fixture: ComponentFixture<IdentificationTypesComponent>;


  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.identificationTypes = ["Australian Passport", "Driver Licence", "Foreign Passport", "Foreign ID Card"]
    component.selectedIdentificationTypes = [false, false, false, false];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
