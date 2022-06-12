import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Application } from '../model/application';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  applicationList: Application[] = [];

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.initialise()
  }

  initialise() {
    this.applicationList = this.applicationService.getApplicationList();
  }
}
