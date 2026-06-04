import SectionHeader from '@/components/shared/SectionHeader';
import styles from './WhyJoinUs.module.scss';

const GrowthIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M4 20l6-6 4 4 8-10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 10h4v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LearningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 5L2 11l12 6 12-6-12-6z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M5 14v5.5C5 22 8.6 24 14 24s9-2 9-4.5V14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 11v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const InnovationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 4v3M14 21v3M4 14H7M21 14h3M6.3 6.3l2.1 2.1M19.6 19.6l2.1 2.1M6.3 21.7l2.1-2.1M19.6 8.4l2.1-2.1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.75"/>
  </svg>
);

const CollaborationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.75"/>
    <circle cx="19" cy="9" r="4" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M2 24c0-4 3-6 7-6s7 2 7 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M19 18c3 0 6 2 6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const FlexibleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <rect x="15" y="4" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <rect x="4" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <rect x="15" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.75"/>
  </svg>
);

const REASONS = [
  {
    Icon: GrowthIcon,
    title: 'Growth Opportunities',
    body: 'Work on a diverse range of enterprise projects that genuinely challenge you. Every engagement builds a new skill, expands your domain knowledge, and moves your career forward.',
  },
  {
    Icon: LearningIcon,
    title: 'Learning Culture',
    body: 'Regular knowledge-sharing sessions, access to courses and conferences, and a team that celebrates curiosity. We invest in the people who invest in their craft.',
  },
  {
    Icon: InnovationIcon,
    title: 'Modern Technology',
    body: 'We work with current, relevant technology stacks on real enterprise problems. You\'ll build systems that matter — not maintain legacy codebases that nobody wants to touch.',
  },
  {
    Icon: CollaborationIcon,
    title: 'Senior Collaboration',
    body: 'Small, senior teams without bureaucracy. Direct access to experienced engineers and decision-makers. No silos, no politics — just focused people building great software together.',
  },
  {
    Icon: FlexibleIcon,
    title: 'Flexible Environment',
    body: 'Outcome-focused culture with remote-friendly policies and flexible working arrangements. We measure results, not hours at a desk.',
  },
];

const WhyJoinUs = () => (
  <section className={styles.section} aria-label="Why join Accetraa">
    <div className="container">
      <SectionHeader
        eyebrow="Why Accetraa"
        title="A place where engineers do their best work"
        subtitle="We hire carefully, treat people well, and create the conditions for exceptional output. Here is what that looks like in practice."
        align="center"
        className={styles.header}
      />

      <div className={styles.grid}>
        {REASONS.map(({ Icon, title, body }) => (
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

export default WhyJoinUs;
