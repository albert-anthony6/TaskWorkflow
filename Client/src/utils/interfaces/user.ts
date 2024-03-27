export interface User {
  username: string;
  displayName: string;
  token: string;
  avatar?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}
