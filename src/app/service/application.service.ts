
import { Injectable } from '@angular/core';
import { Application } from '../model/application';
import defaultApplicationData from '../default-application-data.json'

const DEFAULT_LAST_APPLICATION_NUMBER = "2003"
const LAST_APPLICATION_NUMBER_KEY = "LastApplicationNumber"
const DATA_KEY = "ApplicationListData"


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  getApplicationList() {
    let applications = this.retrieveFromStorage()

    if (applications == null) {
      sessionStorage.setItem(DATA_KEY, JSON.stringify(defaultApplicationData));
      sessionStorage.setItem(LAST_APPLICATION_NUMBER_KEY, DEFAULT_LAST_APPLICATION_NUMBER);
      applications = this.retrieveFromStorage();
    }

    if (!applications) {
      applications = [];
    }

    return applications;
  }

  getApplication(applicationNumber: number) {
    let applications = this.retrieveFromStorage();
    if (applications != null) {
      for (let i = 0; i < applications.length; i++) {
        let application = applications[i];
        if (application.applicationNumber == applicationNumber) {
          return <Application>application
        }
      }
    }
    return <Application>{};
  }

  addApplication(application: Application) {
    console.log(application)
    let applications = this.retrieveFromStorage();
    if (applications != null) {
      application.applicationNumber = this.generateNewApplicationNumber();
      applications.push(application);
      this.saveToStorage(applications);
    }
    return application.applicationNumber;
  }

  updateApplication(updatedApplication: Application) {
    let data = this.getApplicationList();
    if (data != null) {
      for (let i = 0; i < data.length; i++) {
        let application = data[i];
        if (application.applicationNumber == updatedApplication.applicationNumber) {
          data[i] = updatedApplication;
          break
        }
      }
      console.log(data);
      this.saveToStorage(data);
    }
  }

  deleteApplication(applicationNumber: number) {
    let applications = this.retrieveFromStorage();
    if (applications != null) {
      for (let i = 0; i < applications.length; i++) {
        let application = applications[i];
        if (application.applicationNumber == applicationNumber) {
          applications.splice(i, 1);
          this.saveToStorage(applications);
          break
        }
      }
    }
  }


  private saveToStorage(applications: Application[]) {
    sessionStorage.setItem(DATA_KEY, JSON.stringify(applications));
  }

  private retrieveFromStorage() {
    var data = sessionStorage.getItem(DATA_KEY);
    if (data != null) {
      return <Application[]>JSON.parse(data);
    }
    else {
      return null;
    }
  }
  private generateNewApplicationNumber() {
    let applicationNumber = Number(sessionStorage.getItem(LAST_APPLICATION_NUMBER_KEY));
    if (applicationNumber != null) {
      applicationNumber++;
      sessionStorage.setItem(LAST_APPLICATION_NUMBER_KEY, applicationNumber.toString())
      return applicationNumber;
    }
    else {
      return 9999;
    }
  }
}
