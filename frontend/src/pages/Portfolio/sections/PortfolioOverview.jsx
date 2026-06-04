import SectionHeader from '@/components/shared/SectionHeader';
import styles from './PortfolioOverview.module.scss';

const CAPABILITIES = [
  {
    title: 'Product Development',
    body: 'We build enterprise-grade software products — from zero to production-ready. Every product is designed to scale and maintained to last.',
  },
  {
    title: 'Custom Software Delivery',
    body: 'Bespoke solutions engineered to your exact requirements. No off-the-shelf compromise — systems that fit your processes, not the other way around.',
  },
  {
    title: 'Enterprise Solutions',
    body: 'Large-scale platforms serving thousands of users across complex organisational structures. Security, compliance, and performance built in by default.',
  },
  {
    title: 'Industry-Focused Innovation',
    body: 'Deep vertical expertise allows us to move faster and make better decisions. We arrive with domain knowledge, not just technical skills.',
  },
];

const PortfolioOverview = () => (
  <section className={styles.section} aria-label="Portfolio overview">
    <div className="container">
      <div className={styles.layout}>
        <div className={styles.left}>
          <SectionHeader
            eyebrow="Our Work"
            title="Products built. Projects delivered. Impact created."
            subtitle="Accetraa's portfolio represents years of focused enterprise engineering — each project a demonstration of what precision delivery looks like at scale."
            align="left"
          />
        </div>

        <div className={styles.right}>
          {CAPABILITIES.map(({ title, body }) => (
            <div key={title} className={styles.capability}>
              <div className={styles.dot} aria-hidden="true" />
              <div>
                <h3 className={styles.capTitle}>{title}</h3>
                <p className={styles.capBody}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PortfolioOverview;
