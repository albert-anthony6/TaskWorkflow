import { Photo } from './photo';

export interface User {
  id: string;
  displayName: string;
  avatar: Photo;
}

export interface CurrentUser {
  id: string;
  username: string;
  displayName: string;
  token: string;
  avatar: Photo;
  coverImage: Photo;
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
  avatar: Photo;
}
