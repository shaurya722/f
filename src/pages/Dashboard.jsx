import { useStore } from '@/store';
import { Card } from '@/components/shared/Card';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const user = useStore(state => state.user);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.grid}>
        <Card title="Welcome Back!">
          <p className={styles.text}>
            Hello, {user?.name || user?.email || 'User'}!
          </p>
          <p className={styles.text}>
            This is your dashboard. Here you can manage your account and view important information.
          </p>
        </Card>

        <Card title="Quick Stats">
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statValue}>24</div>
              <div className={styles.statLabel}>Total Users</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>12</div>
              <div className={styles.statLabel}>Active Sessions</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>Notifications</div>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity">
          <ul className={styles.activityList}>
            <li className={styles.activityItem}>User logged in</li>
            <li className={styles.activityItem}>Profile updated</li>
            <li className={styles.activityItem}>New user created</li>
            <li className={styles.activityItem}>Settings changed</li>
          </ul>
        </Card>

        <Card title="System Status">
          <div className={styles.statusGrid}>
            <div className={styles.statusItem}>
              <span className={styles.statusIndicator} style={{ backgroundColor: '#10b981' }} />
              <span>API Status: Operational</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusIndicator} style={{ backgroundColor: '#10b981' }} />
              <span>Database: Connected</span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusIndicator} style={{ backgroundColor: '#f59e0b' }} />
              <span>Cache: Warning</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
