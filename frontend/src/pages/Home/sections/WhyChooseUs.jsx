import SectionHeader from '@/components/shared/SectionHeader';
import styles from './WhyChooseUs.module.scss';

const BriefcaseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="3" y="9" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M10 9V7a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M3 15h22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const LayersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 3L26 9l-12 6L2 9z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M2 15l12 6 12-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 21l12 6 12-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeadsetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M4 16v-3a10 10 0 0120 0v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <rect x="2" y="16" width="5" height="7" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <rect x="21" y="16" width="5" height="7" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M26 22v1a3 3 0 01-3 3h-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 3L4 7v8c0 5.5 4.5 10 10 13 5.5-3 10-7.5 10-13V7L14 3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M9.5 14l3 3 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BENEFITS = [
  {
    Icon: BriefcaseIcon,
    title: 'Industry Expertise',
    body: 'Deep domain knowledge across FinTech, HealthTech, Logistics, and SaaS. We understand your sector before writing the first line of code.',
  },
  {
    Icon: LayersIcon,
    title: 'Scalable Architecture',
    body: 'Every system we build is designed for 10x growth from the start — distributed, observable, and cloud-native by default.',
  },
  {
    Icon: HeadsetIcon,
    title: 'Dedicated Engagement',
    body: 'Transparent communication, fixed points of contact, and weekly progress reviews. No black boxes, no surprises.',
  },
  {
    Icon: ShieldIcon,
    title: 'Security by Default',
    body: 'Enterprise-grade security practices — OWASP compliance, threat modelling, and security reviews — are built into every delivery.',
  },
];

const WhyChooseUs = () => (
  <section className={styles.section} aria-label="Why choose Accetraa">
    <div className="container">
      <SectionHeader
        eyebrow="Why Accetraa"
        title="The difference you'll notice from day one"
        subtitle="We're not a staffing agency and we're not a typical consultancy. We're a technology partner that takes ownership."
        align="center"
        className={styles.sectionHeader}
      />

      <div className={styles.grid}>
        {BENEFITS.map(({ Icon, title, body }) => (
          <div key={title} className={styles.card}>
            <div className={styles.iconWrap}>
              <Icon />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardBody}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
