import SectionHeader from '@/components/shared/SectionHeader';
import styles from './ServicesOverview.module.scss';

const PILLARS = [
  {
    number: '01',
    title: 'End-to-End Engineering',
    body: 'From requirements to release — we own the full delivery lifecycle. Architecture, development, quality assurance, and production deployment under one roof.',
  },
  {
    number: '02',
    title: 'Technology Consulting',
    body: 'Strategic guidance on platform selection, system modernisation, and cloud migration. We challenge assumptions, validate approaches, and protect your investment.',
  },
  {
    number: '03',
    title: 'Digital Transformation',
    body: 'We help enterprises move from legacy systems to modern, scalable platforms — incrementally and safely, without disrupting ongoing operations.',
  },
  {
    number: '04',
    title: 'Enterprise Integration',
    body: 'API design, third-party integrations, data pipelines, and microservices architecture. We connect your systems and eliminate the silos that slow your business down.',
  },
];

const ServicesOverview = () => (
  <section className={styles.section} aria-label="Services overview">
    <div className="container">
      <div className={styles.layout}>

        <div className={styles.left}>
          <SectionHeader
            eyebrow="What We Deliver"
            title="Complete technology services for the modern enterprise"
            subtitle="Accetraa provides end-to-end technology services across the full software delivery lifecycle. Whether you need a new platform built from scratch, an existing system modernised, or strategic technology advice — our senior engineers and consultants deliver with rigour and accountability."
            align="left"
          />
        </div>

        <div className={styles.right}>
          {PILLARS.map(({ number, title, body }) => (
            <div key={number} className={styles.pillar}>
              <span className={styles.pillarNumber}>{number}</span>
              <div>
                <h3 className={styles.pillarTitle}>{title}</h3>
                <p className={styles.pillarBody}>{body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default ServicesOverview;
