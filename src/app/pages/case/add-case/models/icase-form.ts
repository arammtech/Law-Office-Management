import { FormControl } from "@angular/forms";

export interface ICaseForm {
  subject: FormControl<string>;
  partiesToTheCase: FormControl<number>;
  estimatedTime: FormControl<Date>;
  courtType: FormControl<string>;
  assignedOfficer: FormControl<string>;
  caseNumber: FormControl<string>;
  lawyerOpinion: FormControl<string>;
}
