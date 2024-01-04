import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent {

  userName: string = '';
  userEmail: string = '';
  inputValues: string = ''; // Variable to store the input string
  parsedValues: string[] = [];
  constructor(public dialogRef: MatDialogRef<AddnewComponent>) {}

  submitForm() {
    // Perform actions on form submission
    // For example, you can close the dialog and pass data back if needed
    this.dialogRef.close({ name: this.userName, email: this.userEmail });
  }
  parseInputValues() {
    this.parsedValues = this.inputValues.split(',').map(value => value.trim());
    console.log('Parsed values:', this.parsedValues);
    // You can perform actions with the parsed values here
  }
}
