import SectionHeader from '@/components/shared/SectionHeader';
import TeamMemberCard from '@/components/shared/TeamMemberCard';
import styles from './TeamSection.module.scss';

const TEAM = [
  {
    name: 'Arjun Nair',
    role: 'Chief Executive Officer',
    description: 'Over 15 years of experience leading technology delivery for enterprise clients across FinTech and HealthTech. Passionate about building engineering cultures that ship with confidence.',
  },
  {
    name: 'Priya Sharma',
    role: 'Chief Technology Officer',
    description: 'Cloud architecture specialist with a decade of experience designing distributed systems on AWS and Azure. Previously led platform engineering at a publicly-listed SaaS company.',
  },
  {
    name: 'Rohit Desai',
    role: 'VP — Engineering',
    description: 'Full-stack engineer turned engineering leader. Rohit oversees all delivery teams and maintains the technical standards that define Accetraa\'s engineering culture.',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Head of Client Success',
    description: 'Ensures every engagement delivers measurable value from day one. Ananya has managed programmes for enterprises with 10,000+ end users across diverse industries.',
  },
];

const TeamSection = () => (
  <section className={styles.section} aria-label="Our team">
    <div className="container">
      <SectionHeader
        eyebrow="The Team"
        title="Senior leaders. Proven experience."
        subtitle="Our leadership team combines deep technical expertise with strategic business acumen. Every client engagement benefits directly from their involvement."
        align="center"
        className={styles.header}
      />

      <div className={styles.grid}>
        {TEAM.map(member => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>

      <p className={styles.footnote}>
        Our full team of engineers, designers, and consultants grows with every engagement.
        We match the right talent to every project — not just who is available.
      </p>
    </div>
  </section>
);

export default TeamSection;
