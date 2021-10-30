export type Profile = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type UserState = {
  profile: Profile;
  error: unknown;
};

export type UserPayload = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export type UserLoginPayload = Omit<UserPayload, "username" | "role">;

export type RegistrationResponse = {
  data: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    token: string;
  };
};
