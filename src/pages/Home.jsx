import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { constants } from '@/constants';
import { Card } from '@/components/shared/Card';
import styles from './Home.module.css';

export const Home = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to React Template</h1>
        <p className={styles.subtitle}>
          A production-ready React.js template with modern tooling and best
          practices
        </p>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <Link
              to={constants.routes.dashboard}
              className={styles.primaryButton}
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to={constants.routes.login}
                className={styles.primaryButton}
              >
                Get Started
              </Link>
              <a href="#features" className={styles.secondaryButton}>
                Learn More
              </a>
            </>
          )}
        </div>
      </div>

      <div id="features" className={styles.features}>
        <h2 className={styles.featuresTitle}>Key Features</h2>

        <div className={styles.featureGrid}>
          <Card title="🚀 Modern Stack">
            <p>
              Built with React 18, Vite, and the latest web technologies for
              optimal performance.
            </p>
          </Card>

          <Card title="🎨 Beautiful UI">
            <p>
              Tailwind CSS and CSS Modules for flexible, maintainable styling
              with dark mode support.
            </p>
          </Card>

          <Card title="🔐 Authentication">
            <p>
              Complete auth flow with JWT tokens, protected routes, and user
              management.
            </p>
          </Card>

          <Card title="📊 State Management">
            <p>
              Zustand for client state and React Query for server state with
              caching.
            </p>
          </Card>

          <Card title="✨ Developer Experience">
            <p>
              ESLint, Prettier, Husky for code quality and consistent
              formatting.
            </p>
          </Card>

          <Card title="📱 Responsive">
            <p>
              Mobile-first design that works seamlessly across all device sizes.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
