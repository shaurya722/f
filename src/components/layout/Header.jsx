import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/store';
import { constants } from '@/constants';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, mode, toggleMode } = useStore(
    state => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      logout: state.logout,
      mode: state.mode,
      toggleMode: state.toggleMode,
    })
  );

  const handleLogout = () => {
    logout();
    navigate(constants.routes.login);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={constants.routes.home} className={styles.logo}>
          {import.meta.env.VITE_APP_NAME || 'React App'}
        </Link>

        <nav className={styles.nav}>
          {isAuthenticated ? (
            <>
              <Link to={constants.routes.dashboard} className={styles.link}>
                Dashboard
              </Link>
              <Link to={constants.routes.users} className={styles.link}>
                Users
              </Link>
              <Link to={constants.routes.profile} className={styles.link}>
                Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.button}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to={constants.routes.login} className={styles.button}>
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={toggleMode}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {mode === constants.theme.dark ? '🌙' : '☀️'}
          </button>
        </nav>

        {user && <span className={styles.userInfo}>{user.name || user.email}</span>}
      </div>
    </header>
  );
};
