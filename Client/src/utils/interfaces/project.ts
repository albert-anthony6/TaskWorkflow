import { Task } from './task';
import { User } from './user';

export interface Project {
  projectId: string;
  name: string;
  owner: string;
  activeTicketsCount: number;
  membersCount: number;
  userTicketsCount: number;
  tickets: Task[];
  members: User[];
}
