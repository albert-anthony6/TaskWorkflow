import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthUserFormValues } from '../utils/interfaces/user';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store/configureStore';
import { signInUser } from '../store/slices/userSlice';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<AuthUserFormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function handleDemoLogin() {
    setIsDemoLoading(true);
    onSubmit({ email: 'bob@test.com', password: 'Pa$$w0rd' } as AuthUserFormValues);
  }

  function onSubmit(data: AuthUserFormValues) {
    setIsLoading(true);
    dispatch(signInUser(data))
      .catch(() => {
        setError('password', { message: 'Invalid email or password' });
      })
      .finally(() => {
        setIsLoading(false);
        if (isDemoLoading) setIsDemoLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <label htmlFor="email">Enter your email address</label>
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
            required: 'Password is required.'
          })}
          id="password"
          type="password"
          placeholder="Password"
        />
        <div className={errors.password ? 'caption error__show' : 'caption error__hide'}>
          * {errors.password?.message}
        </div>
      </div>
      <div className="login-actions">
        <button type="submit" className="button__primary">
          {isLoading && !isDemoLoading ? <div className="loading-spinner" /> : <span>Login</span>}
        </button>
        <button type="button" onClick={handleDemoLogin} className="button__secondary">
          {isDemoLoading && isDemoLoading ? (
            <div className="loading-spinner" />
          ) : (
            <span>Demo Account (Bypass Login)</span>
          )}
        </button>
      </div>
      <div className="caption">
        Don't have an account yet? <Link to="/register">Sign Up</Link>
      </div>
    </form>
  );
}
