export interface loggedUser {
  id:string;
  username:string;
  role:string;
  isTempPassword:boolean;
  expiration:Date;
}