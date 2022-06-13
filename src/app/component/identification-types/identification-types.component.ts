import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'identification-types',
  templateUrl: './identification-types.component.html',
  styleUrls: ['./identification-types.component.css']
})

export class IdentificationTypesComponent implements OnInit{
   @Input()
   identificationTypes: string[] = []
   
   @Input()
   selectedIdentificationTypes: boolean[] = []

   @Output() identificationTypesChanged = new EventEmitter<boolean[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(identificationTypePosition : number, event: any){
    let checkboxElement = <HTMLInputElement>event

    this.selectedIdentificationTypes[identificationTypePosition] = checkboxElement.checked;

    this.identificationTypesChanged.emit(this.selectedIdentificationTypes);
  }
}
