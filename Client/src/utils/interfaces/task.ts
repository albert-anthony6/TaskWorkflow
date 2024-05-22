import { ColorOption } from './color-options';
import { Photo } from './photo';
import { User } from './user';

export interface Task {
  id?: string;
  title: string;
  description: string;
  severity: ColorOption | string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  assignees?: User[] | string[] | null;
  attachments?: Photo[] | null;
  appUserIds?: string[];
}
