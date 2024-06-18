import { Photo } from './photo';

export interface User {
  id: string;
  displayName: string;
  bio: string;
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
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
}

export interface AuthUserFormValues {
  email: string;
  password: string;
  confirmPassword: string;
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
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
}
