import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/configureStore';
import { registerUser } from '../store/slices/userSlice';
import { AuthUserFormValues } from '../utils/interfaces/user';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<AuthUserFormValues>({
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
      username: ''
    }
  });

  function onSubmit(data: AuthUserFormValues) {
    dispatch(registerUser(data)).catch((err) => {
      if (err.error) {
        err.error.forEach((err: string) => {
          if (err.includes('Password')) {
            setError('password', { message: err });
          } else if (err.includes('Email')) {
            setError('email', { message: err });
          } else if (err.includes('Username')) {
            setError('username', { message: err });
          } else if (err.includes('DisplayName')) {
            setError('displayName', { message: err });
          }
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <label htmlFor="display-name">Add a display name</label>
        <input
          {...register('displayName', {
            required: 'Display name is required.'
          })}
          id="display-name"
          type="text"
          placeholder="Display Name"
        />
        <div className={errors.displayName ? 'caption error__show' : 'caption error__hide'}>
          * {errors.displayName?.message}
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="username">Add a username</label>
        <input
          {...register('username', {
            required: 'Username is required.'
          })}
          id="username"
          type="text"
          placeholder="Username"
        />
        <div className={errors.username ? 'caption error__show' : 'caption error__hide'}>
          * {errors.username?.message}
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="email">Add your email address</label>
        <input
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: 'Not a valid email address'
            }
          })}
          id="email"
          type="text"
          placeholder="Email"
        />
        <div className={errors.email ? 'caption error__show' : 'caption error__hide'}>
          * {errors.email?.message}
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="password">Enter your password</label>
        <input
          {...register('password', {
            required: 'Password is required.',
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Password does not meet complexity requirements'
            }
          })}
          id="password"
          type="password"
          placeholder="Password"
        />
        <div className={errors.password ? 'caption error__show' : 'caption error__hide'}>
          * {errors.password?.message}
        </div>
      </div>
      <button type="submit" className="button__primary">
        Register
      </button>
      <div className="caption">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
}
