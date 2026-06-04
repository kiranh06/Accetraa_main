import SectionHeader from '@/components/shared/SectionHeader';
import styles from './WhyOurServices.module.scss';

const TeamIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="10" cy="9" r="4" stroke="currentColor" strokeWidth="1.75"/>
    <circle cx="20" cy="9" r="3" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M2 24c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M20 17c2.8 0 5 2 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const AgileIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 4v4M14 20v4M4 14H8M20 14h4M6.3 6.3l2.8 2.8M19 19l2.7 2.7M6.3 21.7l2.8-2.8M19 9l2.7-2.7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.75"/>
  </svg>
);

const SecurityIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 3L4 7v8c0 5.5 4.5 10 10 13 5.5-3 10-7.5 10-13V7L14 3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M9.5 14l3 3 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScaleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M4 20l7-7 4 4 9-11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 9h5v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M4 15v-3a10 10 0 0120 0v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <rect x="2" y="15" width="5" height="6" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <rect x="21" y="15" width="5" height="6" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M26 20v1a3 3 0 01-3 3h-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const TransparencyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M9 13h10M9 17h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M9 9h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const DIFFERENTIATORS = [
  {
    Icon: TeamIcon,
    title: 'Senior-Only Engineering',
    body: 'Every engagement is staffed exclusively with senior engineers. No juniors learning on your project, no hidden ramp-up time.',
  },
  {
    Icon: AgileIcon,
    title: 'Agile Without the Theatre',
    body: 'We practise genuine agile delivery — tight feedback loops, working software every sprint, and backlog discipline that keeps projects on track.',
  },
  {
    Icon: SecurityIcon,
    title: 'Security by Design',
    body: 'Security is built into every architecture decision, code review, and deployment pipeline. Not added at the end as an afterthought.',
  },
  {
    Icon: ScaleIcon,
    title: 'Built to Scale',
    body: 'Every system we design accommodates your next phase of growth. Performance testing, capacity planning, and elastic architecture are standard.',
  },
  {
    Icon: SupportIcon,
    title: 'Dedicated Post-Launch Support',
    body: 'We do not disappear after go-live. Dedicated support teams, SLA commitments, and proactive monitoring are included in every engagement.',
  },
  {
    Icon: TransparencyIcon,
    title: 'Full Transparency',
    body: 'Weekly progress reports, open access to delivery metrics, honest risk escalation. You always know exactly where your project stands.',
  },
];

const WhyOurServices = () => (
  <section className={styles.section} aria-label="Why choose our services">
    <div className="container">
      <SectionHeader
        eyebrow="Why Accetraa Services"
        title="The standards that set our services apart"
        subtitle="Anyone can list services. What differentiates Accetraa is how we deliver them — with consistent quality, honest communication, and genuine accountability at every step."
        align="center"
        className={styles.header}
      />

      <div className={styles.grid}>
        {DIFFERENTIATORS.map(({ Icon, title, body }) => (
          <div key={title} className={styles.card}>
            <div className={styles.iconWrap} aria-hidden="true"><Icon /></div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.body}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyOurServices;
