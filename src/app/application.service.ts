import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Application {
  applicationNumber : Number;
  applicationType : String;
  amount : Number;
  status: String;

}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data =>{
      console.log(data);
    });
   }
   public getJSON(): Observable<any>{
     return this.http.get('./application/application.json')
   }
  }
