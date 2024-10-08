declare type ClaimsPayload = {
  username: string;
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
};

declare namespace Express {
  export interface Request {
    claims?: ClaimsPayload;
  }
}
