import { Component, OnInit } from '@angular/core';
import applicationdata from '../application/application.json';
import { Router } from '@angular/router';

interface Application {
  applicationNumber : Number;
  applicationType : String;
  amount : Number;
  status: String;

}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  constructor(private router: Router) { }
  title = 'LocalStorage';
  application: Application[] = applicationdata;
  public onDetailsClick(){
    this.router.navigate(['applications/:id']);
  }


}
