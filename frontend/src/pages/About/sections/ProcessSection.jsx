import SectionHeader from '@/components/shared/SectionHeader';
import styles from './ProcessSection.module.scss';

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin every engagement with structured discovery sessions — business goals, technical constraints, current-state assessment, and stakeholder alignment. This phase eliminates ambiguity before a single line of code is written.',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Architecture design, technology selection, delivery roadmap, and resource planning. Every decision is documented and reviewed with the client before work begins. No surprises, no hidden assumptions.',
    duration: '1–2 weeks',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Agile delivery in two-week sprints with working software demonstrated at every milestone. Peer-reviewed code, automated testing from day one, and continuous integration throughout.',
    duration: 'Ongoing sprints',
  },
  {
    number: '04',
    title: 'Testing',
    description: 'Comprehensive quality assurance — unit, integration, performance, security, and user acceptance testing. We do not move to production until every gate is passed and client sign-off is received.',
    duration: '1–2 weeks',
  },
  {
    number: '05',
    title: 'Deployment',
    description: 'Automated CI/CD pipelines, zero-downtime deployments, infrastructure-as-code, and full runbook documentation. Your team receives complete ownership of everything we build.',
    duration: '1 week',
  },
  {
    number: '06',
    title: 'Support',
    description: 'Ongoing managed support, SLA-backed incident response, proactive monitoring, and planned maintenance windows. We remain accountable for system health long after the initial build.',
    duration: 'Continuous',
  },
];

const ProcessSection = () => (
  <section className={styles.section} aria-label="How we work">
    <div className="container">
      <SectionHeader
        eyebrow="How We Work"
        title="A proven process built for enterprise delivery"
        subtitle="Our methodology removes uncertainty and ensures every stakeholder knows exactly where the project stands at every point in time."
        align="center"
        className={styles.header}
      />

      <ol className={styles.timeline} aria-label="Delivery process steps">
        {STEPS.map(({ number, title, description, duration }, index) => (
          <li key={number} className={styles.step}>
            <div className={styles.stepLeft}>
              <div className={styles.stepNumber} aria-hidden="true">{number}</div>
              {index < STEPS.length - 1 && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepHeader}>
                <h3 className={styles.stepTitle}>{title}</h3>
                <span className={styles.duration}>{duration}</span>
              </div>
              <p className={styles.stepDescription}>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;
