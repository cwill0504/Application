
import { ApplicationInitStatus, Injectable } from '@angular/core';
import { Application } from './model/application';

const APPLICATION_LIST_INITIAL_DATA = [{ "applicationNumber": 2000, "applicationType": "Home Loan", "amount": 500000, "status": "Active", "applicants": [{ "name": "William Chau", "identificationTypes": ["Australian Passport", "Driver Licence"], "gender": "Male" }, { "name": "Irene Chau", "identificationTypes": ["Foreign Passport"], "gender": "Female" }] }, { "applicationNumber": 2001, "applicationType": "Personal Loan", "amount": 12500, "status": "Inactive", "applicants": [{ "name": "Brown Smith", "identificationTypes": ["Foreign ID Card"], "gender": "Not Disclosed" }] }, { "applicationNumber": 2003, "applicationType": "Business Loan", "amount": 120000, "status": "Active", "applicants": [{ "name": "Melissa Cocombe", "identificationTypes": ["Australian Passport"], "gender": "Female" }, { "name": "Michael Cocombe", "identificationTypes": ["Driver Licence", "Foreign Passport"], "gender": "Female" }] }]
const DATA_KEY = "ApplicationListData"
const APPNUMBER_KEY = "LastAppNumber" 

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  getApplicationList() {
    let applications = this.retrieveFromStorage();
    if (applications == null) {
      localStorage.setItem(DATA_KEY, JSON.stringify(APPLICATION_LIST_INITIAL_DATA));
      localStorage.setItem(APPNUMBER_KEY, "2003");
      applications = this.retrieveFromStorage();
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
    return null;
  }

  addApplication(application: Application) {
    console.log(application)
    let applications = this.retrieveFromStorage();
    if (applications != null) {
      application.applicationNumber = this.generateNewApplicationNumber();
      applications.push(application);
      this.saveToStorage(applications);
    }
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

  deleteApplicant(applicants: string) {
    let applicant = this.retrieveFromStorage();
    if (applicant != null) {
      for (let i = 0; i < applicant.length; i++ ) {
        let application = applicant[5];
      }
    }

  }

  
  private saveToStorage(applications: Application[]) {
  localStorage.setItem(DATA_KEY, JSON.stringify(applications));
}

  private retrieveFromStorage() {
  var data = localStorage.getItem(DATA_KEY);
  if (data != null) {
    return <Application[]>JSON.parse(data);
  }
  else {
    return null
  }
}
private generateNewApplicationNumber(){
  let applicationNumber = Number(localStorage.getItem(APPNUMBER_KEY));
  if (applicationNumber != null){
    applicationNumber++;
    localStorage.setItem(APPNUMBER_KEY, applicationNumber.toString())
    return applicationNumber;
  }
  else{
    return 9999
  }
}

}
