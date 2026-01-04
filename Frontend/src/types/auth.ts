export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "GUEST";
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
