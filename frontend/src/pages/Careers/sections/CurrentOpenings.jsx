import { Link } from 'react-router-dom';
import EmptyState from '@/components/shared/EmptyState';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/shared/SectionHeader';
import { ROUTES } from '@/utils/constants';
import styles from './CurrentOpenings.module.scss';

const BriefcaseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="4" y="11" width="24" height="17" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M11 11V9a3 3 0 013-3h4a3 3 0 013 3v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 18h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CurrentOpenings = () => (
  <section className={styles.section} aria-label="Current job openings">
    <div className="container">
      <SectionHeader
        eyebrow="Open Positions"
        title="Current opportunities"
        subtitle="We hire when we find the right person — not to fill a quota. Check back regularly as new positions open."
        align="center"
        className={styles.header}
      />

      <div className={styles.board}>
        <EmptyState
          icon={<BriefcaseIcon />}
          title="No active openings at this time"
          body="We don't currently have open positions listed, but we're always interested in hearing from exceptional engineers and consultants. Join our talent network to be among the first to know when roles open."
          action={
            <Button as={Link} to={ROUTES.CONTACT} variant="primary" size="md">
              Join Our Talent Network
            </Button>
          }
        />
      </div>

      <p className={styles.note}>
        Positions are announced on this page, our{' '}
        <a href="https://linkedin.com/company/accetraa" target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
          LinkedIn page
        </a>
        , and to registered talent network members first.
      </p>
    </div>
  </section>
);

export default CurrentOpenings;
