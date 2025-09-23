export interface loggedUser {
  accessTokenExpirationDate: Date;
  refreshTokenExpirationDate: Date;
  role: string;
}

export interface IrefreshToken {
  accessTokenExpirationDate: Date;
  refreshTokenExpirationDate: Date;
}

export interface LoginResponse {
  role: string;
  refreshTokenExpirationDate: Date;
  accessTokenExpirationDate: Date;
}
