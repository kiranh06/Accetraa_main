import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUI } from '@/context/UIContext';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUI();

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <a href="#main-content" className={styles.skipNav}>
        Skip to main content
      </a>

      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/" className={styles.logo} onClick={closeMobileMenu}>
            Accetraa
          </NavLink>

          <ul
            id="main-nav-links"
            className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}
          >
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  onClick={closeMobileMenu}
                  aria-current={undefined}
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
            aria-controls="main-nav-links"
          >
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
