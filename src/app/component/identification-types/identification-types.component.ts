/*
 * Custom component to display identification types as a grouped checkbox.
 * Input Parameters:
 * 'identificationTypes' = Array of identification types to be displayed.
 * 'selectedIdentificationTypes' = Array of boolean that corresponds to the chosen identification type. (true = Selected, false = Unselected)
 * Output Parameter:
 * 'identificationTypesChanged' = Event emitter to allow the parent component to subscribe to retrieve the updated selected/unselected 
 *  identification types as an array of boolean.
 */
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
