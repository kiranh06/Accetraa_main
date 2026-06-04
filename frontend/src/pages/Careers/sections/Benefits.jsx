import SectionHeader from '@/components/shared/SectionHeader';
import styles from './Benefits.module.scss';

const RemoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="4" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M9 23h10M14 19v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M9 11h10M9 14h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const DevIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M10 19L4 14l6-5M18 19l6-5-6-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 7l-4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const MentorIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M2 24c0-4 3.1-6 7-6s7 2 7 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <circle cx="21" cy="12" r="3" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M17 24c0-3 2-4.5 4-4.5s4 1.5 4 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M15 6l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M14 8v6l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConferenceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M3 11h22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M9 22l2-3h6l2 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 22h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const HealthIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 24s-9-5.5-9-12a9 9 0 0118 0c0 6.5-9 12-9 12z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M10 13h8M14 9v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const BENEFITS = [
  {
    Icon: RemoteIcon,
    title: 'Remote Opportunities',
    body: 'All roles are remote-capable. We care about the quality of your work, not your postcode. Coordinate around outcomes, not office hours.',
  },
  {
    Icon: DevIcon,
    title: 'Skill Development',
    body: 'Annual learning budget for courses, certifications, and technical books. We sponsor conference attendance and give you time to develop your expertise.',
  },
  {
    Icon: MentorIcon,
    title: 'Senior Mentorship',
    body: 'Every team member is paired with a senior engineer for structured mentorship. Grow faster in six months here than in two years at a conventional company.',
  },
  {
    Icon: ClockIcon,
    title: 'Flexible Hours',
    body: 'Core collaboration hours with flexibility around them. We trust you to manage your time and deliver high-quality work consistently.',
  },
  {
    Icon: ConferenceIcon,
    title: 'Conference Access',
    body: 'Sponsored attendance at industry conferences, meetups, and workshops. We encourage our engineers to stay connected to the wider technology community.',
  },
  {
    Icon: HealthIcon,
    title: 'Health & Wellbeing',
    body: 'Comprehensive health coverage and a culture that takes burnout seriously. Sustainable pace, reasonable expectations, genuine work-life balance.',
  },
];

const Benefits = () => (
  <section className={styles.section} aria-label="Employee benefits">
    <div className="container">
      <SectionHeader
        eyebrow="Benefits"
        title="What you get for doing great work"
        subtitle="We believe people do their best work when they feel supported, trusted, and fairly rewarded. These are the benefits we have designed to reflect that belief."
        align="center"
        theme="dark"
        className={styles.header}
      />

      <div className={styles.grid}>
        {BENEFITS.map(({ Icon, title, body }) => (
          <div key={title} className={styles.card}>
            <div className={styles.iconWrap} aria-hidden="true"><Icon /></div>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.body}>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
