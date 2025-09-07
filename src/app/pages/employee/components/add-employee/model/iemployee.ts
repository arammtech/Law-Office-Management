export interface ICreateEmployee {
  person: IPerson;
  role: string; // 'string';
  email: string; // "^[H1F$hlwhj(8hT`B>@Zw(TCs1)x0ZgS(I6?e!5!Mq}~~P'tt.x*cl.>C;hFjU2z.AT7";
}

export interface IPerson {
  fullName: string; // 'string';
  nationalId: string; // '4134282500';
  birthDate: string; // '2025-09-04';
  phoneNumber: string; // '+322216628686';
  address: string; //'stringstri';
  countryCode: string; //'AE';
}
