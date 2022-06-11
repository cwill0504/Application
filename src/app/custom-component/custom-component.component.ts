import { Component, OnInit } from '@angular/core';
import { ApplicationComponent } from '../application/application.component';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.css']

  
})
// identificationTypes = ["Australian Passport", "Driver Licence", "Foreign Passport", "Foreign ID Card"]
export class CustomComponentComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
