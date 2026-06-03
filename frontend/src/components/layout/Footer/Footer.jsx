import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/utils/constants';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <NavLink to="/" className={styles.logo}>Accetraa</NavLink>
          <p className={styles.tagline}>Accelerating your digital future.</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink key={path} to={path} className={styles.link}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          &copy; {currentYear} Accetraa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
