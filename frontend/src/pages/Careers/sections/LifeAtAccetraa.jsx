import SectionHeader from '@/components/shared/SectionHeader';
import styles from './LifeAtAccetraa.module.scss';

const CULTURE_STATS = [
  { value: '100%',  label: 'Remote-capable roles' },
  { value: '8+',    label: 'Years of engineering' },
  { value: 'Agile', label: 'Delivery culture' },
  { value: '0',     label: 'Unnecessary meetings' },
];

const IMAGE_PLACEHOLDERS = [
  { label: 'Team Collaboration',      aspect: 'wide' },
  { label: 'Engineering Deep-Dives',  aspect: 'tall' },
  { label: 'Remote-First Working',    aspect: 'square' },
  { label: 'Knowledge Sharing',       aspect: 'wide' },
];

const LifeAtAccetraa = () => (
  <section className={styles.section} aria-label="Life at Accetraa">
    <div className="container">
      <div className={styles.layout}>

        <div className={styles.left}>
          <SectionHeader
            eyebrow="Life at Accetraa"
            title="A culture built around doing excellent work"
            subtitle="We are deliberate about how we work. Small teams, clear ownership, honest communication, and a bias towards action over process. This is what our day-to-day looks like."
            align="left"
          />

          <dl className={styles.stats}>
            {CULTURE_STATS.map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <dt className={styles.statValue}>{value}</dt>
                <dd className={styles.statLabel}>{label}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.values}>
            {[
              'We ship working software, not slide decks.',
              'Senior engineers mentor — not just manage.',
              'Feedback flows in every direction.',
              'Your time is yours outside working hours.',
            ].map(v => (
              <div key={v} className={styles.valueItem}>
                <span className={styles.valueDot} aria-hidden="true" />
                <p className={styles.valueText}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.photoGrid}>
            {IMAGE_PLACEHOLDERS.map(({ label, aspect }) => (
              <div
                key={label}
                className={`${styles.photo} ${styles[`photo--${aspect}`]}`}
                aria-label={`${label} — photo coming soon`}
                role="img"
              >
                <div className={styles.photoInner}>
                  <PhotoIcon />
                  <span className={styles.photoLabel}>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

const PhotoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="3" y="6" width="22" height="17" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M10 6l2-3h4l2 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default LifeAtAccetraa;
