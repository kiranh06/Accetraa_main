import SectionHeader from '@/components/shared/SectionHeader';
import styles from './IndustriesServed.module.scss';

const FinanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 11h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 15h2M10 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HealthcareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3C8.7 3 6 5.7 6 9c0 5.2 6 11 6 11s6-5.8 6-11c0-3.3-2.7-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9.5 9h5M12 6.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ManufacturingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 20V12l5-4v4l4-4v4l4-4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M18 7h3v13h-3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M6 20v-4h3v4M11 20v-4h3v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const RetailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 3h2l2.4 11a2 2 0 002 1.6h8.4a2 2 0 002-1.6L21 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="21" r="1.5" stroke="currentColor" strokeWidth="1.25"/>
    <circle cx="18" cy="21" r="1.5" stroke="currentColor" strokeWidth="1.25"/>
  </svg>
);

const EducationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 4L2 9l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TechIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 10l3-3 2 2 3-3 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GovtIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 10h18M4 10l8-7 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 10v9M10 10v9M14 10v9M18 10v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 19h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LogisticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M1 3h15v13H1zM16 8h3l3 3v5h-6V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.25"/>
    <circle cx="18.5" cy="18.5" r="2" stroke="currentColor" strokeWidth="1.25"/>
  </svg>
);

const INDUSTRIES = [
  { Icon: FinanceIcon,       name: 'Financial Services',         description: 'Banking, FinTech, insurance, and payment platforms' },
  { Icon: HealthcareIcon,    name: 'Healthcare & Life Sciences', description: 'Clinical systems, patient platforms, and health-tech' },
  { Icon: ManufacturingIcon, name: 'Manufacturing',              description: 'Factory automation, ERP, and production systems' },
  { Icon: RetailIcon,        name: 'Retail & E-Commerce',        description: 'Omnichannel platforms and commerce infrastructure' },
  { Icon: EducationIcon,     name: 'Education Technology',       description: 'LMS, adaptive learning, and student analytics' },
  { Icon: TechIcon,          name: 'Technology & SaaS',          description: 'Product engineering and platform development' },
  { Icon: GovtIcon,          name: 'Government & Public Sector', description: 'Citizen-facing platforms and back-office systems' },
  { Icon: LogisticsIcon,     name: 'Logistics & Supply Chain',   description: 'Tracking, routing, and warehouse systems' },
];

const IndustriesServed = () => (
  <section className={styles.section} aria-label="Industries we serve">
    <div className="container">
      <SectionHeader
        eyebrow="Industries"
        title="Sector expertise that drives better outcomes"
        subtitle="We bring domain-specific knowledge to every engagement. Understanding your industry means we ask better questions, make faster decisions, and deliver solutions that actually fit how your business works."
        align="center"
        className={styles.header}
      />

      <div className={styles.grid}>
        {INDUSTRIES.map(({ Icon, name, description }) => (
          <div key={name} className={styles.card}>
            <div className={styles.iconWrap} aria-hidden="true"><Icon /></div>
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

export default IndustriesServed;
