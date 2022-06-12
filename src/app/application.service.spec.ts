import { TestBed } from '@angular/core/testing';
import { ApplicationService } from './application.service';
import { Application } from './model/application';

describe('ApplicationService', () => {
  let service: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationService);

    const APPLICATION_TEST_DATA = [{ "applicationNumber": 2000, "applicationType": "Home Loan", "amount": 500000, "status": "Active", "applicants": [{ "name": "William Chau", "identificationTypes": ["Australian Passport", "Driver Licence"], "gender": "Male" }, { "name": "Irene Chau", "identificationTypes": ["Foreign Passport"], "gender": "Female" }] }, { "applicationNumber": 2001, "applicationType": "Personal Loan", "amount": 12500, "status": "Inactive", "applicants": [{ "name": "Brown Smith", "identificationTypes": ["Foreign ID Card"], "gender": "Not Disclosed" }] }, { "applicationNumber": 2003, "applicationType": "Business Loan", "amount": 120000, "status": "Active", "applicants": [{ "name": "Melissa Cocombe", "identificationTypes": ["Australian Passport"], "gender": "Female" }, { "name": "Michael Cocombe", "identificationTypes": ["Driver Licence", "Foreign Passport"], "gender": "Female" }] }]
    let store = JSON.stringify(APPLICATION_TEST_DATA);

    const mockSessionStorage = {
      getItem: (key: string): string => {
        return store;
      },
      setItem: (key: string, value: string) => {
        store = value;
      },
      removeItem: (key: string) => {
        store = "";
      },
      clear: () => {
        store = "";
      }
    };

    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear')
      .and.callFake(mockSessionStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get application for valid application number', () => {
    let validApplicationNumber = 2001; // exist in storage
    let application = service.getApplication(validApplicationNumber);

    expect(application).toBeTruthy();
    expect(application.applicationNumber).toBe(validApplicationNumber)
  });

  it('should not get application for invalid application number', () => {
    let validApplicationNumber = 2005; // does not exist in storage
    let application = service.getApplication(validApplicationNumber);

    expect(application).toEqual(<Application>{});
  });
});