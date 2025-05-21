export interface LoginRequest {
  /** @example "admin@example.com" */
  email: string;
  /** @example "admin123" */
  password: string;
}

export interface LoginResponse {
  /** @example "eyJhbGci..." */
  token: string;
}
