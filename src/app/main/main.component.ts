import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { ApplicationService } from '../application.service';
import { Application } from '../model/application';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent{
  title = 'Applications';
  //application = [{"applicationNumber":1,"applicationType":"Home Loan","amount":500000,"status":"Active","applicants":[{"name":"William Chau","identificationType":["Australian Passport","Driver Licence"],"gender":"Male"},{"name":"Irene Chau","idType":["Foreign Passport"],"gender":"Female"}]},{"applicationNumber":2,"applicationType":"Personal Loan","amount":12500,"status":"Inactive","applicants":[{"name":"Brown Smith","identificationType":["Foreign ID Card"],"gender":"Not Disclosed"}]},{"applicationNumber":3,"applicationType":"Business Loan","amount":120000,"status":"Active","applicants":[{"name":"Melissa Cocombe","identificationType":["Australian Passport"],"gender":"Female"},{"name":"Michael Cocombe","identificationType":["Driver Licence","Foreign Passport"],"gender":"Female"}]}]
  applicationList ?: Application[] | null;

  constructor(private router: Router, private route: ActivatedRoute, private applicationService: ApplicationService) { 
    this.init()
  }
  

  init() {
    this.applicationList = this.applicationService.getApplicationList();
  }

 
}
