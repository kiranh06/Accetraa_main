import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import styles from './HeroSection.module.scss';

const STATS = [
  { value: '50+',  label: 'Projects Delivered' },
  { value: '30+',  label: 'Clients Served' },
  { value: '8+',   label: 'Industries' },
  { value: '5+',   label: 'Years Experience' },
];

// Abstract dashboard mockup — pure CSS/JSX, no images
const HeroVisual = () => (
  <div className={styles.visual} aria-hidden="true">
    <div className={styles.mockCard}>
      <div className={styles.mockHeader}>
        <div className={styles.mockDots}>
          <span /><span /><span />
        </div>
        <span className={styles.mockCardTitle}>Platform Analytics</span>
      </div>

      <div className={styles.mockChart}>
        {[55, 80, 45, 92, 68, 85, 60].map((h, i) => (
          <div key={i} className={styles.mockBar} style={{ '--bar-h': `${h}%` }} />
        ))}
      </div>

      <div className={styles.mockMetrics}>
        {[
          { val: '+32%',  lbl: 'Revenue' },
          { val: '98.9%', lbl: 'Uptime' },
          { val: '2.4M',  lbl: 'Events/day' },
        ].map(({ val, lbl }) => (
          <div key={lbl} className={styles.mockMetric}>
            <span className={styles.mockMetricVal}>{val}</span>
            <span className={styles.mockMetricLbl}>{lbl}</span>
          </div>
        ))}
      </div>
    </div>

    <div className={styles.floatBadge1}>
      <span className={styles.floatDot} />
      Deploy complete
    </div>
    <div className={styles.floatBadge2}>
      <span className={styles.floatArrow}>↑</span>
      99.8% SLA
    </div>
  </div>
);

const HeroSection = () => (
  <section className={styles.hero} aria-label="Welcome to Accetraa">
    <div className="container">
      <div className={styles.inner}>

        {/* Left — text content */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>Enterprise Technology Partner</span>

          <h1 className={styles.headline}>
            Accelerate Your<br />
            <span className={styles.accent}>Digital Future</span>
          </h1>

          <p className={styles.copy}>
            Accetraa delivers enterprise-grade engineering — product development, cloud
            architecture, and AI-powered automation — that drives measurable business outcomes.
          </p>

          <div className={styles.actions}>
            <Button as={Link} to={ROUTES.CONTACT} variant="accent" size="lg">
              Book Consultation
            </Button>
            <Button as={Link} to={ROUTES.SERVICES} variant="ghost" size="lg" className={styles.ghostLight}>
              View Services →
            </Button>
          </div>
        </div>

        {/* Right — visual */}
        <HeroVisual />

      </div>
    </div>

    {/* Stats strip */}
    <div className={styles.statsWrap}>
      <div className="container">
        <dl className={styles.statsGrid}>
          {STATS.map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <dt className={styles.statValue}>{value}</dt>
              <dd className={styles.statLabel}>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default HeroSection;
