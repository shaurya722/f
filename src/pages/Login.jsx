import { useForm } from 'react-hook-form';
import { useLogin } from '@/features/auth/useLogin';
import { Card } from '@/components/shared/Card';
import styles from './Login.module.css';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginMutation = useLogin();

  const onSubmit = data => {
    loginMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} title="Login">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={styles.input}
              placeholder="john@example.com"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={styles.input}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.demoInfo}>
          <p className={styles.demoText}>Demo Credentials:</p>
          <p className={styles.demoCredentials}>
            Email: john@mail.com
            <br />
            Password: changeme
          </p>
        </div>
      </Card>
    </div>
  );
};
