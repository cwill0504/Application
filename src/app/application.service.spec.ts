import { TestBed } from '@angular/core/testing';
import { ApplicationService } from './application.service';
import { Application } from './model/application';
import defaultApplicationData from './default-application-data.json'

describe('ApplicationService', () => {
  let service: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationService);

    let store: {[key: string] : any} = {}
    store['ApplicationListData'] = JSON.stringify(defaultApplicationData);

    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
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