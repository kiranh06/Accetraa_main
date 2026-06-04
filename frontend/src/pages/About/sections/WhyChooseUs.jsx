import SectionHeader from '@/components/shared/SectionHeader';
import styles from './WhyChooseUs.module.scss';

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Experienced Engineering Team',
    body: 'Our engineers average over eight years of industry experience across enterprise, SaaS, and regulated industries. We bring seniority to every engagement, not just to the account management layer.',
    highlight: '8+ years average experience',
  },
  {
    number: '02',
    title: 'Modern Technology Stack',
    body: 'We work with proven, contemporary technologies — React, Node.js, Python, Kubernetes, AWS, Azure, and beyond. No legacy debt, no framework lock-in, no outdated practices introduced into your systems.',
    highlight: 'Cloud-native by default',
  },
  {
    number: '03',
    title: 'Scalable Solution Design',
    body: 'Every system we design accommodates at least 10x your current load. We engineer for growth from the first architecture review, preventing costly refactors as your business scales.',
    highlight: 'Designed for 10x growth',
  },
  {
    number: '04',
    title: 'Long-Term Partnership Model',
    body: 'We structure our engagements for sustained value — not one-off projects. Clients retain a dedicated team that understands their domain, their codebase, and their business context deeply over time.',
    highlight: 'Sustained, not transactional',
  },
];

const WhyChooseUs = () => (
  <section className={styles.section} aria-label="Why choose Accetraa">
    <div className="container">
      <div className={styles.layout}>

        <div className={styles.left}>
          <SectionHeader
            eyebrow="Why Accetraa"
            title="Four reasons the best enterprises choose us"
            subtitle="We have earned our clients' trust through consistent delivery, honest communication, and technical rigour — not through sales pitches."
            align="left"
          />
        </div>

        <div className={styles.right}>
          {DIFFERENTIATORS.map(({ number, title, body, highlight }) => (
            <div key={number} className={styles.item}>
              <div className={styles.numberCol}>
                <span className={styles.number}>{number}</span>
                <div className={styles.numberLine} aria-hidden="true" />
              </div>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{title}</h3>
                <p className={styles.itemBody}>{body}</p>
                <span className={styles.highlight}>{highlight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default WhyChooseUs;
