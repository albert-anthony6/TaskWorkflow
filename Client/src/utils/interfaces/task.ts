export interface Task {
  id?: string;
  title: string;
  description: string;
  severity: { value: string; label: string; color: string } | string;
  startDate: Date | null;
  endDate: Date | null;
}
