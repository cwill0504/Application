import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../service/application.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Applicant, Application } from '../model/application';
import { Router } from '@angular/router';
import { createIdentificationTypesValidator } from '../validator/identification-type-validator/identification-type-validator.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  applicationMode: string = 'read';
  applicantMode: string = 'read';
  formValue !: FormGroup;
  application: Application = {
    "applicationNumber": 0,
    "applicationType": "",
    "amount": 0,
    "status": "",
    "applicants": []
  };
  applicationNumber?: string | null;
  editApplicantIndex = -1;
  identificationTypeOptions = ["Australian Passport", "Driver Licence", "Foreign Passport", "Foreign ID Card"]

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private applicationService: ApplicationService, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      applicationType: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.pattern('((^[1-9][0-9]{3,}$)|(^[0-9]*\.[0-9]{1,2}$))')]],
      status: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      identificationTypes: this.formBuilder.array(this.identificationTypeOptions.map(x => false), [createIdentificationTypesValidator()]),
      gender: [null, [Validators.required]]
    })
    this.initialise(this.formValue);
  }

  get identificationTypes(): FormArray {
    return this.formValue.get('identificationTypes') as FormArray;
  }

  get applicationType() {
    let formApplicationType = this.formValue.controls['applicationType'].value;
    if (formApplicationType == null) {
      this.formValue.controls['applicationType'].setValue(this.application.applicationType);
    }
    return this.formValue.get('applicationType');
  }

  get name() { return this.formValue.get('name'); }

  get amount() {
    let formAmountValue = this.formValue.controls['amount'].value;
    if (formAmountValue == null && this.application.amount > 0) {
      this.formValue.controls['amount'].setValue(this.application.amount);
    }
    return this.formValue.get('amount');
  }

  get gender() { return this.formValue.get('gender'); }

  initialise(formValue: FormGroup) {
    this.applicationNumber = this.route.snapshot.paramMap.get('id');
    console.log(this.applicationNumber)

    if (this.applicationNumber != null) {
      // View application
      this.application = this.applicationService.getApplication(Number(this.applicationNumber));
      formValue.controls['status'].setValue(this.application.status);
      // formValue.controls['status'].disable;

      this.applicationMode = 'read';
      this.applicantMode = 'read';
    } else {
      // New application
      this.applicationMode = 'new';
      this.applicantMode = 'read';
      // formValue.controls['status'].enable;
    }

    this.disableApplicantFormValidators();
  }

  /*
  *=========================================
  * Application management
  *=========================================
  */
  saveNewApplication() {
    let newApplication: Application = {
      applicationNumber: 0,
      applicationType: this.formValue.get('applicationType')?.value,
      amount: this.formValue.get('amount')?.value,
      status: this.formValue.get('status')?.value,
      applicants: this.application.applicants
    };
    let applicationNumber = this.applicationService.addApplication(newApplication);
    this.applicationMode = "read"
    this.applicantMode = 'read'
    this.router.navigate(['/application/', applicationNumber]);
  }

  saveUpdatedApplication() {
    console.log(this.application)
    let updatedApplication: Application = {
      applicationNumber: this.application.applicationNumber,
      applicationType: this.formValue.get('applicationType')?.value,
      amount: this.formValue.get('amount')?.value,
      status: this.formValue.get('status')?.value,
      applicants: this.application.applicants
    };
    this.applicationService.updateApplication(updatedApplication);
    this.applicationMode = "read"
  }

  editApplication() {
    this.applicationMode = 'edit'
    // this.applicantMode = 'read'
  }

  deleteApplication() {
    if (confirm("Are you sure you wish to delete Application Number:  " + this.applicationNumber + "?")) {
      console.log("Implement delete functionality here");
      this.applicationService.deleteApplication(Number(this.applicationNumber));
      this.router.navigate(['main'])
    }
  }

  cancelApplication() {
    if (confirm("Are you sure you wish to cancel? Any inputs or updates will not be saved.")) {
      console.log("Implement delete functionality here");
      this.router.navigate(['main'])
    }
  }

  /*
  *=========================================
  * Applicant management
  *=========================================
  */
  newApplicant() {
    this.applicantMode = 'new';
    this.enableApplicantFormValidators();
  }

  addApplicant() {
    let newApplicant = this.getApplicantFromForm();

    if (this.isNewApplicantNameDuplicate(newApplicant.name)) {
      alert("Duplicate applicant name: " + newApplicant.name);
    } else {
      this.application.applicants.push(this.getApplicantFromForm());
      this.applicantMode = 'read';
      //this.resetApplicantForm();
      this.disableApplicantFormValidators();
    }
  }

  editApplicant(applicantIndex: number) {
    this.applicantMode = 'edit';
    let editApplicant = this.application.applicants[applicantIndex];
    console.log(editApplicant);
    this.formValue.controls['name'].setValue(editApplicant.name);

    let types = [];

    for (let i = 0; i < this.identificationTypeOptions.length; i++) {
      types.push(editApplicant.identificationTypes.find(type => type == this.identificationTypeOptions[i]) != null);
    }

    this.formValue.controls['identificationTypes'].setValue(types);

    console.log(this.formValue.value['identificationTypes']);

    this.formValue.controls['gender'].setValue(editApplicant.gender);
    this.editApplicantIndex = applicantIndex;
    this.enableApplicantFormValidators();
  }

  updateApplicant(applicantIndex: number) {
    let updateApplicant = this.getApplicantFromForm();

    if (this.isUpdateApplicantNameDuplicate(applicantIndex, updateApplicant.name)) {
      alert("Duplicate applicant name: " + updateApplicant.name);
    } else {
      this.application.applicants.splice(applicantIndex, 1, this.getApplicantFromForm())
      this.applicantMode = 'read'
      this.editApplicantIndex = -1;
      //this.resetApplicantForm();
      this.disableApplicantFormValidators();
    }
  }

  deleteApplicant(applicantIndex: number) {
    if (confirm("Are you sure you wish to delete this applicant?")) {
      this.application.applicants.splice(applicantIndex, 1);
    }
  }

  cancelApplicant() {
    if (confirm("Are you sure you wish to cancel? Any inputs or updates will not be saved.")) {
      this.applicantMode = 'read'
      this.disableApplicantFormValidators();
    }
  }

  onIdentificationTypesChanged(identificationTypes: boolean[]) {
    console.log("Parent=" + identificationTypes)
    this.formValue.controls['identificationTypes'].setValue(identificationTypes);
  }

  private enableApplicantFormValidators() {
    // identificationTypes: this.formBuilder.array(this.identificationTypes.map(x => false), Validators.nullValidator),
    this.formValue.controls['name'].setValidators([Validators.required, Validators.pattern('[a-zA-Z ]+')]);
    // this.formValue.controls['identificationtypes'].setValidators(Validators.required);
    this.formValue.controls['gender'].setValidators(Validators.required);
  }

  private disableApplicantFormValidators() {
    this.formValue.controls['name'].setValidators(Validators.nullValidator);
    // this.formValue.controls['identificationtypes'].setValidators(Validators.nullValidator);
    this.formValue.controls['gender'].setValidators(Validators.nullValidator);
  }

  private resetApplicantForm() {
    this.formValue.controls['name'].reset()
    this.formValue.controls['identificationTypes'].reset();
    this.formValue.controls['gender'].reset();
  }

  private getApplicantFromForm() {
    let applicant: Applicant = {
      name: this.formValue.get('name')?.value,
      identificationTypes: [],
      gender: this.formValue.get('gender')?.value,
    }

    if (applicant.name && applicant.gender) {
      for (let i = 0; i < this.identificationTypeOptions.length; i++) {
        if (this.formValue.value["identificationTypes"][i]) {
          applicant.identificationTypes.push(this.identificationTypeOptions[i])
        }
      }
    }

    return applicant;
  }

  private isNewApplicantNameDuplicate(name: string) {
    return this.application.applicants.find(applicant => applicant.name.trim().toLocaleLowerCase() == name.trim().toLowerCase());
  }

  private isUpdateApplicantNameDuplicate(applicantIndex: number, name: string) {
    let matchedApplicantIndex = this.application.applicants.findIndex(applicant => applicant.name.trim().toLocaleLowerCase() == name.trim().toLowerCase());
    return (matchedApplicantIndex == -1 ? false : matchedApplicantIndex != applicantIndex);
  }
}