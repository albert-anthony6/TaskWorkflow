import axios, { AxiosResponse } from 'axios';
import { Task } from '../utils/interfaces/task';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Tasks = {
  list: () => requests.get<Task[]>('/tickets'),
  details: (id: string) => requests.get<Task>(`/tickets/${id}`),
  create: (task: Task) => requests.post<void>('/tickets', task),
  update: (task: Task) => requests.put<void>(`/tickets/${task.id}`, task),
  delete: (id: string) => requests.delete<void>(`/tickets/${id}`)
};

const agent = {
  Tasks
};

export default agent;
