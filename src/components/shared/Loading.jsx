import styles from './Loading.module.css';

export const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};
