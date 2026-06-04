import styles from './StatisticsSection.module.scss';

const STATS = [
  { value: '50+',  label: 'Projects Delivered',    description: 'Enterprise-grade systems shipped to production' },
  { value: '30+',  label: 'Clients Served',         description: 'Organisations that trust Accetraa to deliver' },
  { value: '8+',   label: 'Industries Supported',   description: 'Verticals where we maintain deep domain expertise' },
  { value: '98%',  label: 'Client Retention',       description: 'Clients who return for subsequent engagements' },
  { value: '100%', label: 'On-Time Delivery',        description: 'Milestones delivered on or ahead of schedule' },
  { value: '5+',   label: 'Years of Excellence',    description: 'Building enterprise technology since 2019' },
];

const StatisticsSection = () => (
  <section className={styles.section} aria-label="Company statistics">
    <div className="container">
      <div className={styles.header}>
        <span className={styles.eyebrow}>By the Numbers</span>
        <h2 className={styles.title}>Consistent delivery, measurable results</h2>
        <p className={styles.subtitle}>
          These numbers reflect not what we aspire to, but what we have already delivered.
          Every metric is earned through client partnerships and verified outcomes.
        </p>
      </div>

      <dl className={styles.grid}>
        {STATS.map(({ value, label, description }) => (
          <div key={label} className={styles.stat}>
            <dt className={styles.statValue}>{value}</dt>
            <dd className={styles.statLabel}>{label}</dd>
            <p className={styles.statDescription}>{description}</p>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default StatisticsSection;
