import axios, { AxiosError, AxiosResponse } from 'axios';
import { router } from '../routes/router';
import { Task } from '../utils/interfaces/task';
import { toast } from 'react-toastify';
import { User, UserFormValues } from '../utils/interfaces/user';
import { UserProfile } from '../utils/interfaces/user';
import { Photo } from '../utils/interfaces/photo';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
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
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Tasks = {
  list: () => requests.get<Task[]>('/tickets'),
  details: (id: string) => requests.get<Task>(`/tickets/${id}`),
  create: (task: Task) => requests.post<void>('/tickets', task),
  update: (task: Task) => requests.put<void>(`/tickets/${task.id}`, task),
  delete: (id: string) => requests.delete<void>(`/tickets/${id}`)
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user)
};

const Profile = {
  list: () => requests.get<UserProfile[]>('/profiles'),
  details: (id: string) => requests.get<UserProfile>(`/profiles/${id}`),
  uploadImage: (file: Blob) => {
    const formData = new FormData();
    formData.append('File', file);
    if (file.size > 10485760) {
      toast.error('File size too large. Maximum is 10 MB.');
      return;
    }
    return axios.put<Photo>('photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

const agent = {
  Tasks,
  Account,
  Profile
};

export default agent;
