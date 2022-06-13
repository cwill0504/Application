import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IdentificationTypesComponent } from './identification-types.component';

describe('IdentificationTypesComponent', () => {
  let component: IdentificationTypesComponent;
  let fixture: ComponentFixture<IdentificationTypesComponent>;
  let htmlInputElement: HTMLInputElement;
  let event: Event;

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
