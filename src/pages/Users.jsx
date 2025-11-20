import { useUsers } from '@/features/users/useUsers';
import { Card } from '@/components/shared/Card';
import { Loading } from '@/components/shared/Loading';
import styles from './Users.module.css';

export const Users = () => {
  const { data: users, isLoading, error } = useUsers({ limit: 10 });

  if (isLoading) {
    return <Loading message="Loading users..." />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users</h1>
        <button type="button" className={styles.addButton}>
          Add User
        </button>
      </div>

      <div className={styles.grid}>
        {users?.map(user => (
          <Card key={user.id}>
            <div className={styles.userCard}>
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatar}
                />
              )}
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>{user.name}</h3>
                <p className={styles.userEmail}>{user.email}</p>
                <p className={styles.userRole}>{user.role || 'User'}</p>
              </div>
              <div className={styles.actions}>
                <button type="button" className={styles.actionButton}>
                  View
                </button>
                <button type="button" className={styles.actionButton}>
                  Edit
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
