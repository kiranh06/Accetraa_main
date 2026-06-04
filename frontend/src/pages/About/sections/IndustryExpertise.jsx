import SectionHeader from '@/components/shared/SectionHeader';
import styles from './IndustryExpertise.module.scss';

const FinanceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="3" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M3 13h22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M7 17h2M11 17h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M8 8V6a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const HealthcareIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 4C10 4 7 7 7 11c0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M11 11h6M14 8v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const ManufacturingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M3 22V14l5-4v4l5-4v4l5-4v12H3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M21 8h3v14h-3" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M7 22v-4h4v4M13 22v-4h4v4" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
  </svg>
);

const EducationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 5L2 11l12 6 12-6-12-6z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M6 14v6c0 2 3.6 4 8 4s8-2 8-4v-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 11v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const RetailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M4 4h3l2.7 12.4a2 2 0 002 1.6h9.6a2 2 0 002-1.6L25 8H7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="24" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="20" cy="24" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const TechnologyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="22" height="15" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M10 24h8M14 20v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M8 13l3-3 3 3 3-3 3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const INDUSTRIES = [
  {
    icon: <FinanceIcon />,
    name: 'Financial Services',
    description: 'Core banking platforms, payment processing, regulatory compliance systems, and fraud detection solutions for banks and FinTech firms.',
  },
  {
    icon: <HealthcareIcon />,
    name: 'Healthcare & Life Sciences',
    description: 'Patient management systems, clinical data platforms, HIPAA-compliant applications, and digital health solutions for providers and payers.',
  },
  {
    icon: <ManufacturingIcon />,
    name: 'Manufacturing & Logistics',
    description: 'Supply chain visibility platforms, ERP integrations, IoT-driven factory automation, and warehouse management systems.',
  },
  {
    icon: <EducationIcon />,
    name: 'Education Technology',
    description: 'Learning management systems, adaptive content platforms, student analytics tools, and institution-wide digital transformation programmes.',
  },
  {
    icon: <RetailIcon />,
    name: 'Retail & E-Commerce',
    description: 'Omnichannel commerce platforms, inventory management systems, personalisation engines, and enterprise POS integrations.',
  },
  {
    icon: <TechnologyIcon />,
    name: 'Technology & SaaS',
    description: 'Scalable multi-tenant SaaS architectures, developer tooling, API platforms, and cloud-native product engineering for technology companies.',
  },
];

const IndustryExpertise = () => (
  <section className={styles.section} aria-label="Industry expertise">
    <div className="container">
      <SectionHeader
        eyebrow="Industry Expertise"
        title="Deep domain knowledge across critical sectors"
        subtitle="We do not enter new industries unprepared. Each sector demands different regulatory frameworks, integration patterns, and performance expectations — and our teams are trained accordingly."
        align="center"
        className={styles.header}
      />

      <div className={styles.grid}>
        {INDUSTRIES.map(({ icon, name, description }) => (
          <div key={name} className={styles.card}>
            <div className={styles.iconWrap} aria-hidden="true">{icon}</div>
            <div className={styles.cardContent}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustryExpertise;
