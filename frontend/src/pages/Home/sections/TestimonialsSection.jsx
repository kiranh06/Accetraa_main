import SectionHeader from '@/components/shared/SectionHeader';
import TestimonialCard from '@/components/shared/TestimonialCard';
import styles from './TestimonialsSection.module.scss';

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Accetraa transformed our data infrastructure completely. Their team delivered a real-time analytics platform that reduced our reporting time from 3 days to under 30 minutes. They didn\'t just build what we asked — they improved the design.',
    author: 'Priya Sharma',
    title: 'Head of Technology',
    company: 'FinanceFirst India',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The engineering depth at Accetraa is exceptional. They brought the kind of architectural thinking we hadn\'t seen from other partners. Our new platform went live on time, on budget, and at a performance level we didn\'t expect.',
    author: 'Arjun Mehta',
    title: 'Co-Founder & CTO',
    company: 'LogiTrack Solutions',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Working with Accetraa on our cloud migration was seamless. The clarity of their communication and the quality of their architecture documentation set a standard we now hold every vendor to. System performance improved 40% post-migration.',
    author: 'Deepa Nair',
    title: 'VP Engineering',
    company: 'HealthBridge Technologies',
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className={styles.section} aria-label="Client testimonials">
    <div className="container">
      <SectionHeader
        eyebrow="Client Voices"
        title="Trusted by engineering leaders"
        subtitle="What our clients say about working with Accetraa."
        align="center"
        className={styles.sectionHeader}
      />

      <div className={styles.grid}>
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
