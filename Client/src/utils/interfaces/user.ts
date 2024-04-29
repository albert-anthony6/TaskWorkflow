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
  bio: string;
  token: string;
  avatar: Photo;
  coverImage: Photo;
}

export interface AuthUserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}

export interface EditUserFormValues {
  displayName: string;
  bio?: string;
  facebookLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  twitterLink?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: Photo;
  coverImage: Photo;
}
