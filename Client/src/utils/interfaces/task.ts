import { ColorOption } from './color-options';
import { User } from './user';

export interface Task {
  id?: string;
  title: string;
  description: string;
  severity: ColorOption | string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  assignees: User[] | null;
}
