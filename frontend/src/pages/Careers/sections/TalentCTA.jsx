import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import styles from './TalentCTA.module.scss';

const TalentCTA = () => (
  <section className={styles.section} aria-label="Join our talent network">
    <div className="container">
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Talent Network</span>
          <h2 className={styles.title}>Interested in working with us?</h2>
          <p className={styles.body}>
            We don't ask for CVs upfront. If you're an experienced engineer, consultant, or technical leader who
            believes in doing excellent work, we'd simply like to hear from you. Introduce yourself via our contact
            page and we'll keep you in mind for future opportunities.
          </p>
          <p className={styles.body}>
            We also post updates, project highlights, and new openings on our LinkedIn page. Following us there is
            the easiest way to stay informed.
          </p>
        </div>

        <div className={styles.actions}>
          <Button as={Link} to={ROUTES.CONTACT} variant="primary" size="lg">
            Reach Out Directly
          </Button>
          <a
            href="https://linkedin.com/company/accetraa"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkedInBtn}
          >
            <LinkedInIcon />
            Follow on LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default TalentCTA;
