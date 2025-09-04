import { FormControl } from "@angular/forms";

export interface IContract {
  showContract: FormControl<boolean>;
  contractType: FormControl<number>;
  totalPrice: FormControl<number>;
  issueDate: FormControl<string>;
  expirationDate: FormControl<string>;
  downAmount: FormControl<number>;
  assigned: FormControl<boolean>;
  contractAttachment: FormControl<File | null>;
}
