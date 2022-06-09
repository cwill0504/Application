import { Component } from '@angular/core';

interface Application {
  applicationNumber: number;
  applicationType : string;
  amount : number;
  status: string;
  applicants: Applicant[];
}
interface Applicant {
  name: string;
  identificationTypes: string[];
  gender: string;

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = "LocalStorage"
  
}
