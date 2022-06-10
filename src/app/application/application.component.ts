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
  //application = {"applicationNumber":0,"applicationType":"","amount":0,"status":"","applicants":[{"name":"","identificationType":[""],"gender":""}]};
  // application: Application = {
  //   "applicationNumber": 0,
  //    "applicationType": "",
  //    "amount": 0,
  //    "status":"",
  //    "applicants": []
  // };
  application: Application = {
    "applicationNumber": 0,
     "applicationType": "",
     "amount": 0,
     "status":"",
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

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      applicationType: [''],  
      amount: [null, [Validators.required, Validators.pattern('([0-9]{4,})')]],
      status: [''],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      identificationTypes: [''],
      gender: ['', [Validators.required]]
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
  get applicationType() {return this.formValue.get('applicationType');}
  get gender() {return this.formValue.get('gender');}

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
    console.log(applicationNumber);
    this.mode = "read"
    this.router.navigate(['/application/', applicationNumber]);

  }

  addApplicant() {
    let name = this.formValue.get('name')?.value
    let gender = this.formValue.get('gender')?.value
    let newApplicant: Applicant = {
      name: name,
      identificationTypes: [],
      gender: gender,
    }
    if (name && gender) {
      
      if (this.identificationTypesForm.australianPassport) {
        newApplicant.identificationTypes.push("Australian Passport");
      }
      if (this.identificationTypesForm.driverLicense) {
        newApplicant.identificationTypes.push("Driver License");
      }
      if (this.identificationTypesForm.foreignPassport) {
        newApplicant.identificationTypes.push("Foreign Passport");
      }
      if (this.identificationTypesForm.foreignIdCard) {
        newApplicant.identificationTypes.push("Foreign ID Card");
      }

      console.log(this.application);
      this.application.applicants.push(newApplicant);
      console.log(this.application);
    }
  }

  deleteApplicant() {
    this.applicationService.deleteApplicant()

  }

  editApplication() {
    this.mode = 'edit'


  }

  saveChanges() {
    if (this.application != null) {
      this.applicationService.updateApplication(this.application);
    }
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


    
    console.log(newApplication)

    let applicationNumber = this.applicationService.addApplication(newApplication);
    
    this.mode = "read"
    this.router.navigate(['/application/', applicationNumber]);
  }
}

