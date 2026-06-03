import { NavLink } from 'react-router-dom';
import { useUI } from '@/context/UIContext';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUI();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo} onClick={closeMobileMenu}>
          Accetraa
        </NavLink>

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={closeMobileMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
