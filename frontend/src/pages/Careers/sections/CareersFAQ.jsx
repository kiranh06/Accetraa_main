import FAQAccordion from '@/components/shared/FAQAccordion';
import SectionHeader from '@/components/shared/SectionHeader';
import styles from './CareersFAQ.module.scss';

const FAQ_ITEMS = [
  {
    question: 'How are new positions announced?',
    answer:
      'New openings are published on this page first, then on our LinkedIn company page, and then sent directly to registered talent network members. If you\'d like to be among the first to hear about opportunities, reach out via our contact page and introduce yourself — we\'ll add you to our list.',
  },
  {
    question: 'Do you offer internships or graduate roles?',
    answer:
      'We don\'t currently run a formal internship programme. Our team model works best with experienced practitioners who can contribute immediately. That said, we are open to exceptional final-year students or recent graduates who have a strong portfolio of real projects. If that is you, feel free to get in touch.',
  },
  {
    question: 'Can I submit my profile for future opportunities?',
    answer:
      'Yes — and we encourage it. Use the contact form on our Contact page and describe your background, the type of work you\'re interested in, and what you\'re looking for in your next role. We review every submission and will reach out when a relevant opportunity arises. There is no formal application required at this stage.',
  },
  {
    question: 'What does your interview process look like?',
    answer:
      'Our process is straightforward and respectful of your time. Typically: an initial conversation (30 minutes) to understand your background and goals, a technical discussion (60 minutes) focused on real problems rather than algorithmic puzzles, and a final conversation with a senior team member. For senior roles there may be a short take-home exercise, but we pay for your time.',
  },
  {
    question: 'Do you hire remotely?',
    answer:
      'Yes. All of our roles are remote-capable. We use async communication tools and schedule synchronous time around core collaboration hours. You do not need to be based in Karnataka or anywhere specific in India. We also hire from other countries for senior roles, subject to contractual arrangements.',
  },
  {
    question: 'What kind of experience do you look for?',
    answer:
      'We look for engineers and consultants who have built real systems, taken ownership of outcomes, and can communicate clearly with both technical and non-technical stakeholders. Specific technology experience is less important than evidence that you learn quickly, care about quality, and take pride in what you deliver.',
  },
];

const CareersFAQ = () => (
  <section className={styles.section} aria-label="Careers frequently asked questions">
    <div className="container">
      <div className={styles.layout}>
        <div className={styles.left}>
          <SectionHeader
            eyebrow="FAQ"
            title="Questions about working with us"
            subtitle="Can't find what you're looking for? Send us a message and we'll answer directly."
            align="left"
          />
        </div>
        <div className={styles.right}>
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </div>
    </div>
  </section>
);

export default CareersFAQ;
