import SectionHeader from '@/components/shared/SectionHeader';
import styles from './CompanyOverview.module.scss';

const METRICS = [
  { value: '50+',  label: 'Projects Delivered' },
  { value: '30+',  label: 'Enterprise Clients' },
  { value: '8+',   label: 'Industries Served' },
  { value: '5+',   label: 'Years of Excellence' },
];

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'We Build, Not Just Advise',
    body: 'Our engineers ship production code. Every engagement ends with working software, not a slide deck.',
  },
  {
    number: '02',
    title: 'Enterprise Architecture from Day One',
    body: 'Systems designed to handle 10x growth — security, scalability, and observability built in from the start.',
  },
  {
    number: '03',
    title: 'End-to-End Accountability',
    body: 'One partner from discovery through to production. No handoff chaos, no accountability gaps.',
  },
];

const CompanyOverview = () => (
  <section className={styles.section} aria-label="About Accetraa">
    <div className="container">

      {/* Header + intro */}
      <div className={styles.top}>
        <SectionHeader
          eyebrow="Who We Are"
          title="Built for enterprise. Engineered for impact."
          subtitle="We are a technology partner — not a vendor. Accetraa combines senior engineering talent with strategic thinking to deliver platforms that genuinely move the needle."
          align="left"
        />
      </div>

      {/* Metrics */}
      <dl className={styles.metrics}>
        {METRICS.map(({ value, label }) => (
          <div key={label} className={styles.metric}>
            <dt className={styles.metricValue}>{value}</dt>
            <dd className={styles.metricLabel}>{label}</dd>
          </div>
        ))}
      </dl>

      {/* Differentiators */}
      <div className={styles.differentiators}>
        {DIFFERENTIATORS.map(({ number, title, body }) => (
          <div key={number} className={styles.diff}>
            <span className={styles.diffNumber}>{number}</span>
            <div className={styles.diffContent}>
              <h3 className={styles.diffTitle}>{title}</h3>
              <p className={styles.diffBody}>{body}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default CompanyOverview;
