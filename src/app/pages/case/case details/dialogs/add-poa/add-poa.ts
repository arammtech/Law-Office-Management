import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatDialogModule } from "@angular/material/dialog";
import { clsFormsBuilder } from '../../../../../../core/services/formBuilder/clsforms-builder';

@Component({
  selector: 'app-add-poa',
  imports: [ReactiveFormsModule, NgIf, MatDialogModule],
  templateUrl: './add-poa.html',
  styleUrl: './add-poa.css'
})
export class AddPoa {
submit() {
throw new Error('Method not implemented.');
}
  addPOAForm:FormGroup<IAddPOAForm>;

  constructor(private myfb:clsFormsBuilder) {
    this.addPOAForm = this.myfb.createAddPOAForm();
  }
}

export interface IAddPOAForm {
  poaNumber: FormControl<string>;
  poaIssueDate: FormControl<Date>;
  poaAuthrizedBy: FormControl<string>;
  poaAttachment: FormControl<string>;
}
