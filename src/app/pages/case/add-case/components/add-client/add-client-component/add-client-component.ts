import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe, NgIf, NgFor } from '@angular/common';
import { INewClientForm } from '../../../models/inew-client-form';
import { clsFormsBuilder } from '../../../models/clsforms-builder';
import { ToasterService } from '../../../../../../../core/services/toaster-service';
import {
  NgxIntlTelInputModule,
  NgxIntlTelInputComponent,
} from 'ngx-intl-tel-input';
import { Country, CountrySelectComponent } from '@wlucha/ng-country-select';

@Component({
  selector: 'app-add-client-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    JsonPipe,
    NgxIntlTelInputModule,
    NgFor,
    CountrySelectComponent,
  ],
  templateUrl: './add-client-component.html',
  styleUrl: './add-client-component.css',
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup<INewClientForm>;
  showErrors: boolean = false;
  counties:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddClientComponent>,
    private formBuilder: clsFormsBuilder,
    private toastService: ToasterService,
    private fb: NonNullableFormBuilder
  ) {
    this.clientForm = this.formBuilder.createNewClientForm();
  }

  ngOnInit(): void {
    if (this.clientForm.value.person && this.data.NatId) {
      this.clientForm.controls.person.get('natId')?.setValue(this.data.NatId);
    }

    this.loadCountries();
  }

  submit() {
    if (this.clientForm.invalid) {
      this.showErrors = true;
      this.toastService.error('يرجى ملئ الحقول المطلوب', 'حسنا');
    } else {
      this.dialogRef.close(this.clientForm);
    }
  }

  loadCountries() {
    this.counties = [
      { alpha2: 'SA', translations: { ar: 'السعودية' } },
      { alpha2: 'EG', translations: { ar: 'مصر' } },
      { alpha2: 'AE', translations: { ar: 'الإمارات' } },
      { alpha2: 'JO', translations: { ar: 'الأردن' } },
      { alpha2: 'IQ', translations: { ar: 'العراق' } },
      { alpha2: 'MA', translations: { ar: 'المغرب' } },
      { alpha2: 'DZ', translations: { ar: 'الجزائر' } },
      { alpha2: 'TN', translations: { ar: 'تونس' } },
      { alpha2: 'LB', translations: { ar: 'لبنان' } },
      { alpha2: 'SY', translations: { ar: 'سوريا' } },
      { alpha2: 'YE', translations: { ar: 'اليمن' } },
      { alpha2: 'OM', translations: { ar: 'عُمان' } },
      { alpha2: 'KW', translations: { ar: 'الكويت' } },
      { alpha2: 'QA', translations: { ar: 'قطر' } },
      { alpha2: 'BH', translations: { ar: 'البحرين' } },
    ];
  }
}
