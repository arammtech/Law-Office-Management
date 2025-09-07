export interface ICase {
  subject: string;
  PartiesToTheCase: number;
  estimatedTime: string;
  courtType: number;
  AssignedOfficer: number;
  caseNumber: string;
  lawyerOpinion: string;
}
export interface INewClientModel {
  natId: string;
  name: string;
  address: string;
  birth: Date;
  countryCode: string;
  phone: string;
}

export interface IExistingClientModel {
  Id: string;
  natId: string;
}

export interface IPersonModel {
  id: string;
  name: 'string';
  natId: 'string';
  birthDate: '2025-09-06';
  phone: 'string';
  address: 'string';
  countryCode: 'string';
}


export interface IClientModel {
  id: string;
  person:IPersonModel
}
