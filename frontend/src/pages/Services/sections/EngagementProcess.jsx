import SectionHeader from '@/components/shared/SectionHeader';
import styles from './EngagementProcess.module.scss';

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn your business goals, constraints, and current-state technology. We ask hard questions others avoid.',
    duration: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Consultation',
    description: 'We present findings, validate the approach with your stakeholders, and align on outcomes before any work begins.',
    duration: '1 week',
  },
  {
    number: '03',
    title: 'Planning',
    description: 'Architecture design, delivery roadmap, technology selection, and resourcing — all documented and agreed before the first sprint.',
    duration: '1–2 weeks',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Agile sprints with working software demonstrated fortnightly. Continuous integration, peer review, and automated testing throughout.',
    duration: 'Ongoing',
  },
  {
    number: '05',
    title: 'Deployment',
    description: 'Zero-downtime production releases via automated CI/CD pipelines. Full runbooks, monitoring, and handover documentation.',
    duration: '1 week',
  },
  {
    number: '06',
    title: 'Support',
    description: 'SLA-backed incident response, proactive monitoring, and continuous improvement. We stay accountable long after launch.',
    duration: 'Continuous',
  },
];

const EngagementProcess = () => (
  <section className={styles.section} aria-label="Engagement process">
    <div className="container">
      <SectionHeader
        eyebrow="Engagement Process"
        title="How we deliver — every time"
        subtitle="Our process removes ambiguity and ensures every stakeholder has full visibility from the first call to the final deployment."
        align="center"
        theme="dark"
        className={styles.header}
      />

      <ol className={styles.grid} aria-label="Delivery steps">
        {STEPS.map(({ number, title, description, duration }, index) => (
          <li key={number} className={styles.step}>
            <div className={styles.stepTop}>
              <span className={styles.number}>{number}</span>
              {index < STEPS.length && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
              <span className={styles.duration}>{duration}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default EngagementProcess;
