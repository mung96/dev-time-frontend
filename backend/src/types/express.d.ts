declare namespace Express {
  interface Request {
    member?: import('./jwt-payload').JwtPayload;
  }
}
