import { useProfile } from '@/features/auth/useProfile';
import { Card } from '@/components/shared/Card';
import { Loading } from '@/components/shared/Loading';
import styles from './Profile.module.css';

export const Read = () => {
  const { data: user, isLoading } = useProfile();

  if (isLoading) {
    return <Loading message="Loading profile..." />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Read</h1>

      <div className={styles.grid}>
        <Card title="Personal Information">
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>{user?.name || 'N/A'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{user?.email || 'N/A'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Role:</span>
              <span className={styles.value}>{user?.role || 'User'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>ID:</span>
              <span className={styles.value}>{user?.id || 'N/A'}</span>
            </div>
          </div>
        </Card>

        {user?.avatar && (
          <Card title="Avatar">
            <div className={styles.avatarContainer}>
              <img
                src={user.avatar}
                alt={user.name}
                className={styles.avatar}
              />
            </div>
          </Card>
        )}

        <Card title="Account Settings">
          <div className={styles.settingsList}>
            <button type="button" className={styles.settingButton}>
              Change Password
            </button>
            <button type="button" className={styles.settingButton}>
              Update Email
            </button>
            <button type="button" className={styles.settingButton}>
              Privacy Settings
            </button>
            <button type="button" className={styles.settingButtonDanger}>
              Delete Account
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
