import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Applicant, Application } from '../model/application';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  mode: string = 'read';
  readonly: boolean = true;
  formValue !: FormGroup;
  //application = {"applicationNumber":0,"applicationType":"","amount":0,"status":"","applicants":[{"name":"","identificationType":[""],"gender":""}]};
  application?: Application | null;
  applicationNumber: number = 0;
  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, private applicationService: ApplicationService) { }
  identificationTypesForm = {
    australianPassport: false,
    driverLicense: false,
    foreignPassport: false,
    foreignIdCard: false
  }

  ngOnInit(): void {
    this.loadApplication();
    this.formValue = this.formbuilder.group({
      applicationType: [''],
      amount: [null, [Validators.required, Validators.pattern('([0-9]{4,})')]],
      status: [''],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      identificationTypes: [''],
      gender: ['', [Validators.required]]
    })
  }

  get name() { return this.formValue.get('name'); }
  get amount() { return this.formValue.get('amount'); }

  loadApplication() {
    this.applicationNumber = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.applicationNumber)
    if (this.applicationNumber == 0) {
      this.mode = "new";
      this.readonly = false;
    }
    console.log(this.mode)
    this.application = this.applicationService.getApplication(this.applicationNumber);
  }

  updateApplication() {

  }

  addApplicant() {

  }

  deleteApplicant() {

  }

  updateApplicant() {


  }

  saveChanges() {
    if (this.application != null) {
      this.applicationService.updateApplication(this.application);
    }
  }

  deleteApplication() {
    this.applicationService.deleteApplication(this.applicationNumber);
  }
  createNewApplication() {
    let newApplication: Application = {
      applicationNumber: 0,
      applicationType: this.formValue.get('applicationType')?.value,
      amount: this.formValue.get('amount')?.value,
      status: this.formValue.get('status')?.value,
      applicants: []
    };
    let name = this.formValue.get('name')?.value
    let gender = this.formValue.get('gender')?.value
    if (name && gender) {
      let applicant: Applicant = {
        name: name,
        identificationTypes: [],
        gender: gender,
      }
      if (this.identificationTypesForm.australianPassport) {
        applicant.identificationTypes.push("Australian Passport");
      }
      if (this.identificationTypesForm.driverLicense) {
        applicant.identificationTypes.push("Driver License");
      }
      if (this.identificationTypesForm.foreignPassport) {
        applicant.identificationTypes.push("Foreign Passport");
      }
      if (this.identificationTypesForm.foreignIdCard) {
        applicant.identificationTypes.push("Foreign ID Card");
      }
      newApplication.applicants.push(applicant);
    }
    console.log(newApplication)

    this.applicationService.addApplication(newApplication);
  }
}

