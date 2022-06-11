import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Applicant, Application } from '../model/application';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  mode: string = 'read';
  readonly: boolean = true;
  formValue !: FormGroup;
  application: Application = {
    "applicationNumber": 0,
    "applicationType": "",
    "amount": 0,
    "status": "",
    "applicants": []
  };
  applicationNumber?: string | null;
  constructor(private route: ActivatedRoute, private formbuilder: FormBuilder, private applicationService: ApplicationService, private router: Router) { }
  identificationTypesForm = {
    australianPassport: false,
    driverLicense: false,
    foreignPassport: false,
    foreignIdCard: false
  }
  editApplicantIndex = -1;
  identificationTypes = ["Australian Passport", "Driver Licence", "Foreign Passport", "Foreign ID Card"]

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      applicationType: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern('([0-9]{4,})')]],
      status: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      identificationTypes: [null, [Validators.nullValidator]],
      gender: [null, [Validators.required]]
    })

    this.loadApplication(this.formValue);
  }

  get name() { return this.formValue.get('name'); }
  get amount() {
    let formAmountValue = this.formValue.controls['amount'].value;
    if (formAmountValue == null && this.application.amount > 0) {
      this.formValue.controls['amount'].setValue(this.application.amount);
    }
    return this.formValue.get('amount');
  }

  get applicationType() {
    let formApplicationType = this.formValue.controls['applicationType'].value;
    if (formApplicationType == null) {
      this.formValue.controls['applicationType'].setValue(this.application.applicationType);
    }
    return this.formValue.get('applicationType');
  }

  get gender() { return this.formValue.get('gender'); }

  loadApplication(formValue: FormGroup) {
    this.applicationNumber = this.route.snapshot.paramMap.get('id');
    console.log(this.applicationNumber)
    if (this.applicationNumber != null) {
      this.application = this.applicationService.getApplication(Number(this.applicationNumber));
      formValue.controls['status'].setValue(this.application.status);
      //this.formValue.setValue(this.application.amount, 'amount');
      console.log(this.application);
    } else {
      this.mode = "new";
      this.readonly = false;
    }

  }

  updateApplication() {
    console.log(this.application)
    let updatedApplication: Application = {
      applicationNumber: this.application.applicationNumber,
      applicationType: this.formValue.get('applicationType')?.value,
      amount: this.formValue.get('amount')?.value,
      status: this.formValue.get('status')?.value,
      applicants: this.application.applicants
    };
    let applicationNumber = this.applicationService.updateApplication(updatedApplication);
    console.log(this.applicationType);
    console.log(updatedApplication)
    this.mode = "read"
    this.router.navigate(['/application/', applicationNumber]);

  }
  editApplication() {
    this.mode = 'edit'
    this.formValue.controls['name'].setValidators(Validators.nullValidator);
    this.formValue.controls['gender'].setValidators(Validators.nullValidator);
  }

  deleteApplication() {
    this.applicationService.deleteApplication(Number(this.applicationNumber));
  }

  createNewApplication() {
    let newApplication: Application = {
      applicationNumber: 0,
      applicationType: this.formValue.get('applicationType')?.value,
      amount: this.formValue.get('amount')?.value,
      status: this.formValue.get('status')?.value,
      applicants: this.application.applicants
    };
    let applicationNumber = this.applicationService.addApplication(newApplication);
    this.mode = "read"
    this.router.navigate(['/application/', applicationNumber]);
  }

  updateApplicant(applicantIndex: number) {
    // let updateApplicant: Applicant = {
    //   name: this.formValue.get('name')?.value,
    //   identificationTypes: [],
    //   gender: this.formValue.get('name')?.value,
    // }
    this.application.applicants.splice(applicantIndex, 1, this.getApplicantFromForm())
    this.mode = 'edit'
    this.editApplicantIndex = -1;
    this.resetApplicantForm();
  }

  addApplicant() {
    this.application.applicants.push(this.getApplicantFromForm());
    this.resetApplicantForm();
  }
  
  private resetApplicantForm(){
    // this.formValue.controls['name'].setValue(null);
    this.formValue.controls['name'].reset()
    this.formValue.controls['identificationTypes'].reset();
    this.identificationTypesForm.australianPassport = false;
    this.identificationTypesForm.driverLicense = false;
    this.identificationTypesForm.foreignPassport = false;
    this.identificationTypesForm.foreignIdCard = false;
    this.formValue.controls['gender'].reset();
  }


  private getApplicantFromForm() {
    let applicant: Applicant = {
      name: this.formValue.get('name')?.value,
      identificationTypes: [],
      gender: this.formValue.get('gender')?.value,
    }

    if (applicant.name && applicant.gender) {
      if (this.identificationTypesForm.australianPassport) {
        applicant.identificationTypes.push("Australian Passport");
      }
      if (this.identificationTypesForm.driverLicense) {
        applicant.identificationTypes.push("Driver Licence");
      }
      if (this.identificationTypesForm.foreignPassport) {
        applicant.identificationTypes.push("Foreign Passport");
      }
      if (this.identificationTypesForm.foreignIdCard) {
        applicant.identificationTypes.push("Foreign ID Card");
      }
    }

    return applicant
  }

  deleteApplicant(applicantIndex: number) {
    this.application.applicants.splice(applicantIndex, 1);
  }

  editApplicant(applicantIndex: number) {
    this.mode = 'editApplicant';
    let editApplicant = this.application.applicants[applicantIndex];
    console.log(editApplicant);
    this.formValue.controls['name'].setValue(editApplicant.name);
    this.identificationTypesForm = {
      australianPassport: editApplicant.identificationTypes.find(type => type == 'Australian Passport') != null,
      driverLicense: editApplicant.identificationTypes.find(type => type == 'Driver Licence') != null,
      foreignPassport: editApplicant.identificationTypes.find(type => type == 'Foreign Passport') != null,
      foreignIdCard: editApplicant.identificationTypes.find(type => type == 'Foreign ID Card') != null,
    }
    this.formValue.controls['gender'].setValue(editApplicant.gender);
    this.editApplicantIndex = applicantIndex;
    console.log(this.identificationTypesForm);
  }

  saveChanges() {
    if (this.application != null) {
      this.applicationService.updateApplication(this.application);
    }
  }
}