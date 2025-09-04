import { FormControl } from "@angular/forms";

export interface IPOA {
  showPOA: FormControl<boolean>;
  poaNumber: FormControl<string>;
  poaIssueDate: FormControl<string>;
  poaAuthrizedBy: FormControl<string>;
  poaAttachment: FormControl<string>;
}
