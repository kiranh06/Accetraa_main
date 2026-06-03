import { Link } from 'react-router-dom';
import SEO from '@/components/seo';
import { ROUTES } from '@/utils/constants';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <>
      <SEO title="404 — Page Not Found" />
      <main className={styles.page}>
        <div className={styles.content}>
          <span className={styles.code}>404</span>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.subtitle}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link to={ROUTES.HOME} className={styles.cta}>
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
