export interface User {
  username: string;
  displayName: string;
  token: string;
  avatar: { id: string; url: string };
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: { id: string; url: string };
}
