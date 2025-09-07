import { FormControl } from "@angular/forms";

export interface ICaseForm {
  subject: FormControl<string>;
  PartiesToTheCase: FormControl<number>;
  estimatedTime: FormControl<string>;
  courtType: FormControl<number>;
  AssignedOfficer: FormControl<number>;
  caseNumber: FormControl<string>;
  lawyerOpinion: FormControl<string>;
}
