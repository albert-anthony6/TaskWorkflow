import { ColorOption } from './color-options';

export interface Task {
  id?: string;
  title: string;
  description: string;
  severity: ColorOption | string;
  startDate: Date | string;
  endDate: Date | string;
}
