import { Task } from './task';

export interface Project {
  projectId: string;
  name: string;
  owner: string;
  activeTicketsCount: number;
  membersCount: number;
  currentUserTickets: number;
  tickets: Task[];
}
