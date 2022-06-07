import { Component, OnInit } from '@angular/core';
import applicationdata from '../application/application.json';
import { ActivatedRoute } from '@angular/router';

interface Applications {
  applicationNumber: number;
  name : String;
  idType: String;
  applicationType : String;
  amount : Number;
  status: String;
}

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  application: Applications[] = applicationdata;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadApplication();
  }

  loadApplication(){
    const applicationNumber = Number(this.route.snapshot.paramMap.get('id'));
  }
}
