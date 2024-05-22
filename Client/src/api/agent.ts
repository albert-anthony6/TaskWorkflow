import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from '../routes/router';
import { Task } from '../utils/interfaces/task';
import { toast } from 'react-toastify';
import {
  CurrentUser,
  User,
  AuthUserFormValues,
  EditUserFormValues
} from '../utils/interfaces/user';
import { UserProfile } from '../utils/interfaces/user';
import { PaginatedResult } from '../utils/interfaces/pagination';
import { Project } from '../utils/interfaces/project';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers['pagination'];
    if (pagination) {
      response.data = new PaginatedResult(response.data, JSON.parse(pagination));
      return response as AxiosResponse<PaginatedResult<unknown>>;
    }
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        // If id property is bad, go to not-found page
        if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
          router.navigate('/not-found');
        }
        // Restructuring errors object
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          // Pulling elements out of any subarrays
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error('Unauthorized');
        break;
      case 403:
        toast.error('Forbidden');
        break;
      case 404:
        router.navigate('/not-found');
        break;
      case 500:
        toast.error('Server Error');
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: object) => axios.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Projects = {
  list: (filterUserTasks: boolean) =>
    requests.get<Project[]>(`/projects/?filterUserTickets=${filterUserTasks}`),
  details: (projectId: string) => requests.get<Project>(`/projects/${projectId}`),
  update: (projectId: string, appUserIds: string[]) =>
    requests.patch<void>(`/projects/${projectId}/`, appUserIds)
};

const Tasks = {
  list: () => requests.get<Task[]>('/tickets'),
  details: (id: string) => requests.get<Task>(`/tickets/${id}`),
  create: (projectId: string, task: Task) =>
    requests.post<void>(`/tickets/?projectId=${projectId}`, task),
  edit: (task: Task) => requests.put<void>(`/tickets/${task.id}`, task),
  update: (id: string, status: string) => requests.patch<void>(`/tickets/${id}/`, { status }),
  delete: (id: string) => requests.delete<void>(`/tickets/${id}`),
  uploadImage: (file: Blob, id: string) => {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('Id', id);
    if (file?.size > 10485760) {
      toast.error('File size too large. Maximum is 10 MB.');
      return;
    }
    return axios.post<void>('photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

const Account = {
  current: () => requests.get<CurrentUser>('/account'),
  login: (user: AuthUserFormValues) => requests.post<CurrentUser>('/account/login', user),
  register: (user: AuthUserFormValues) => requests.post<CurrentUser>('/account/register', user)
};

const Profile = {
  list: (pageNumber?: number, pageSize?: number) =>
    axios
      .get<PaginatedResult<User[]>>(
        `/profiles/users/?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .then(responseBody),
  details: (id: string) => requests.get<UserProfile>(`/profiles/users/${id}`),
  uploadImage: (file: Blob, type: string) => {
    const formData = new FormData();
    formData.append('File', file);
    if (file?.size > 10485760) {
      toast.error('File size too large. Maximum is 10 MB.');
      return;
    }
    return axios.put<void>(type === 'avatar' ? 'photos/avatar' : 'photos/cover-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  edit: (user: EditUserFormValues) => requests.put<void>('/profiles/user', user)
};

const agent = {
  Projects,
  Tasks,
  Account,
  Profile
};

export default agent;
