import clsx from 'clsx';
import styles from './Card.module.css';

export const Card = ({ children, className, title }) => {
  return (
    <div className={clsx(styles.card, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
