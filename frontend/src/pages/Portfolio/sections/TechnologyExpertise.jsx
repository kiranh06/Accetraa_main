import SectionHeader from '@/components/shared/SectionHeader';
import styles from './TechnologyExpertise.module.scss';

const TECH_CATEGORIES = [
  {
    label: 'Frontend',
    color: 'primary',
    techs: [
      { name: 'React',      level: 'Expert' },
      { name: 'Next.js',    level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Angular',    level: 'Advanced' },
      { name: 'Vue.js',     level: 'Advanced' },
      { name: 'Tailwind',   level: 'Expert' },
    ],
  },
  {
    label: 'Backend',
    color: 'secondary',
    techs: [
      { name: 'Django',     level: 'Expert' },
      { name: 'FastAPI',    level: 'Expert' },
      { name: 'Node.js',    level: 'Expert' },
      { name: 'GraphQL',    level: 'Advanced' },
      { name: 'PostgreSQL', level: 'Expert' },
      { name: 'Redis',      level: 'Advanced' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    color: 'neutral',
    techs: [
      { name: 'AWS',         level: 'Expert' },
      { name: 'Azure',       level: 'Advanced' },
      { name: 'GCP',         level: 'Advanced' },
      { name: 'Kubernetes',  level: 'Expert' },
      { name: 'Terraform',   level: 'Expert' },
      { name: 'Docker',      level: 'Expert' },
    ],
  },
  {
    label: 'AI & Data',
    color: 'accent',
    techs: [
      { name: 'OpenAI API',  level: 'Expert' },
      { name: 'Claude API',  level: 'Expert' },
      { name: 'LangChain',   level: 'Advanced' },
      { name: 'PyTorch',     level: 'Advanced' },
      { name: 'Apache Spark',level: 'Advanced' },
      { name: 'dbt',         level: 'Expert' },
    ],
  },
];

const TechnologyExpertise = () => (
  <section className={styles.section} aria-label="Technology expertise">
    <div className="container">
      <SectionHeader
        eyebrow="Technology Stack"
        title="The tools we use at enterprise scale"
        subtitle="Our engineers are specialists, not generalists. Each technology we use is validated through production deployments at scale — not just side projects."
        align="center"
        className={styles.header}
      />

      <div className={styles.grid}>
        {TECH_CATEGORIES.map(({ label, color, techs }) => (
          <div key={label} className={`${styles.category} ${styles[`category--${color}`]}`}>
            <h3 className={styles.catLabel}>{label}</h3>
            <div className={styles.techList}>
              {techs.map(({ name, level }) => (
                <div key={name} className={styles.tech}>
                  <span className={styles.techName}>{name}</span>
                  <span className={`${styles.techLevel} ${styles[`techLevel--${level.toLowerCase()}`]}`}>
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechnologyExpertise;
