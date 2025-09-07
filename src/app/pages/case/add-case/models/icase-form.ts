import { FormControl } from "@angular/forms";

export interface ICaseForm {
  subject: FormControl<string>;
  partiesToTheCase: FormControl<number>;
  estimatedTime: FormControl<string>;
  courtType: FormControl<number>;
  assignedOfficer: FormControl<number>;
  caseNumber: FormControl<string>;
  lawyerOpinion: FormControl<string>;
}
