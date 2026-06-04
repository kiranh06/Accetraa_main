import FAQAccordion from '@/components/shared/FAQAccordion';
import SectionHeader from '@/components/shared/SectionHeader';
import styles from './ServicesFAQ.module.scss';

const FAQ_ITEMS = [
  {
    question: 'How long does a typical project take from start to deployment?',
    answer:
      'Project timelines depend on scope and complexity. A focused MVP typically takes 8–14 weeks from the end of discovery through to production deployment. Larger enterprise programmes are structured in phases, with each phase delivering working software. During discovery, we provide a detailed roadmap with committed milestones before development begins.',
  },
  {
    question: 'What technologies do you use for your projects?',
    answer:
      'We select technologies based on what best fits the project\'s requirements — not based on what is trending. Our primary stack includes React and Next.js for frontend, Node.js and Python/Django for backend, PostgreSQL and MongoDB for data, and AWS or Azure for cloud infrastructure. We are not locked to any single stack and will work within your existing technology ecosystem where appropriate.',
  },
  {
    question: 'Do you provide post-launch support and maintenance?',
    answer:
      'Yes — ongoing support is a core part of our service offering. We offer SLA-backed managed support packages that include incident response, security patching, performance monitoring, and planned maintenance windows. Clients on a support retainer also receive a dedicated account engineer who understands their system deeply.',
  },
  {
    question: 'Can your services be customised to fit our specific requirements?',
    answer:
      'Every engagement is scoped specifically to your requirements. We do not apply fixed packages. During discovery we document your exact needs, constraints, and success criteria, and then design a delivery approach that fits your context — whether that is a fixed-price project, a time-and-materials retainer, or an embedded team model.',
  },
  {
    question: 'Do you work with existing codebases or only greenfield projects?',
    answer:
      'We work with both. A significant portion of our work involves modernising existing systems — refactoring legacy codebases, migrating monoliths to microservices, re-platforming on cloud infrastructure, or extending existing products with new capabilities. Our engineers are experienced with inheriting complex, undocumented codebases and bringing them up to modern standards.',
  },
  {
    question: 'How do you ensure the security of the systems you build?',
    answer:
      'Security is built into our delivery process, not applied at the end. We conduct threat modelling during architecture design, enforce secure coding practices in every code review, apply OWASP guidelines throughout development, and perform security-focused testing before every production release. For regulated industries, we can also provide formal security audit documentation.',
  },
  {
    question: 'What does the engagement model look like day-to-day?',
    answer:
      'You will have a dedicated point of contact — either a Project Lead or Engagement Manager — who is available during your business hours. We hold weekly progress reviews, maintain a shared delivery dashboard, and escalate risks early rather than late. We integrate with your preferred communication tools (Slack, Teams, email) and project management platforms (Jira, Linear, Notion).',
  },
  {
    question: 'Do you sign NDAs and handle IP ownership?',
    answer:
      'Yes. We sign a mutual NDA before any discovery sessions, and all IP created during an engagement is assigned to the client upon final payment. We have standard agreements prepared, or we can work with your legal team\'s documentation. We take confidentiality and IP ownership seriously, and these points are clearly documented in our engagement contracts.',
  },
];

const ServicesFAQ = () => (
  <section className={styles.section} aria-label="Frequently asked questions">
    <div className="container">
      <div className={styles.layout}>

        <div className={styles.left}>
          <SectionHeader
            eyebrow="FAQ"
            title="Questions we hear most often"
            subtitle="If your question is not answered here, contact us directly — we will respond within one business day."
            align="left"
          />
          <div className={styles.contactNote}>
            <p className={styles.contactText}>Have a specific question?</p>
            <a href="/contact" className={styles.contactLink}>
              Contact our team →
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <FAQAccordion items={FAQ_ITEMS} />
        </div>

      </div>
    </div>
  </section>
);

export default ServicesFAQ;
