import styles from './SuccessMetrics.module.scss';

const METRICS = [
  { value: '50+',  label: 'Projects Delivered',   sub: 'Enterprise-grade systems in production' },
  { value: '12+',  label: 'Products Built',        sub: 'Proprietary platforms and SaaS products' },
  { value: '8+',   label: 'Industries Served',     sub: 'Deep domain expertise across verticals' },
  { value: '98%',  label: 'Client Satisfaction',   sub: 'Measured across all closed engagements' },
];

const SuccessMetrics = () => (
  <section className={styles.section} aria-label="Success metrics">
    <div className="container">
      <dl className={styles.grid}>
        {METRICS.map(({ value, label, sub }) => (
          <div key={label} className={styles.metric}>
            <dt className={styles.value}>{value}</dt>
            <dd className={styles.label}>{label}</dd>
            <p className={styles.sub}>{sub}</p>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default SuccessMetrics;
