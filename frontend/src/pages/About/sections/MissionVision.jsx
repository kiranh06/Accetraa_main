import SectionHeader from '@/components/shared/SectionHeader';
import styles from './MissionVision.module.scss';

const MissionVision = () => (
  <section className={styles.section} aria-label="Mission and vision">
    <div className="container">
      <SectionHeader
        eyebrow="Our Purpose"
        title="Guided by principles. Driven by outcomes."
        align="center"
        theme="dark"
        className={styles.header}
      />

      <div className={styles.grid}>

        <div className={styles.card} data-card="mission">
          <div className={styles.cardIconWrap} aria-hidden="true">
            <MissionIcon />
          </div>
          <span className={styles.cardLabel}>Mission</span>
          <h3 className={styles.cardTitle}>
            Delivering technology that creates lasting business value
          </h3>
          <p className={styles.cardBody}>
            Our mission is to engineer robust, scalable technology solutions that enable
            enterprises to operate more efficiently, compete more effectively, and serve
            their customers with excellence. We measure success not by lines of code, but by
            the tangible impact we deliver to every organisation we partner with.
          </p>
          <ul className={styles.pillList} aria-label="Mission pillars">
            <li className={styles.pill}>Business-first thinking</li>
            <li className={styles.pill}>Measurable outcomes</li>
            <li className={styles.pill}>Long-term ownership</li>
          </ul>
        </div>

        <div className={styles.card} data-card="vision">
          <div className={styles.cardIconWrap} aria-hidden="true">
            <VisionIcon />
          </div>
          <span className={styles.cardLabel}>Vision</span>
          <h3 className={styles.cardTitle}>
            To be the technology partner that enterprises trust unconditionally
          </h3>
          <p className={styles.cardBody}>
            We envision a future where Accetraa is synonymous with engineering excellence
            across Asia — a firm that global enterprises choose not because we are the
            largest, but because we are the most dependable. A company where every team
            member is proud of the work they deliver and the standards they uphold.
          </p>
          <ul className={styles.pillList} aria-label="Vision pillars">
            <li className={styles.pill}>Engineering excellence</li>
            <li className={styles.pill}>Trusted partnership</li>
            <li className={styles.pill}>Global standards</li>
          </ul>
        </div>

      </div>
    </div>
  </section>
);

const MissionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 3L29 10v12L16 29 3 22V10L16 3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M16 3v9M16 20v9M3 10l9 6M20 16l9 6M3 22l9-6M20 10l9-6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const VisionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 6C9 6 3 16 3 16s6 10 13 10 13-10 13-10S23 6 16 6z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

export default MissionVision;
