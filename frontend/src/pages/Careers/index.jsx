import SEO from '@/components/seo';
import styles from './Careers.module.scss';

const Careers = () => {
  return (
    <>
      <SEO title="Careers" description="Join the Accetraa team." />
      <main className={styles.page}>
        <div className={styles.content}>
          <span className={styles.tag}>Coming Soon</span>
          <h1 className={styles.title}>We&apos;re building our team.</h1>
          <p className={styles.subtitle}>
            Career opportunities at Accetraa will be posted here. Check back soon.
          </p>
        </div>
      </main>
    </>
  );
};

export default Careers;
