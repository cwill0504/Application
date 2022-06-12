import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationTypesComponent } from './identification-types.component';

describe('IdentificationTypesComponent', () => {
  let component: IdentificationTypesComponent;
  let fixture: ComponentFixture<IdentificationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificationTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
