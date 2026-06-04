import { useState } from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import styles from './ServiceDetails.module.scss';

// CMS-ready structure — replace with API data when available
const SERVICES = [
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    category: 'Engineering',
    overview:
      'We design and build enterprise-grade software products from the ground up. Our product engineering service covers the full lifecycle — from user story definition and UX design through backend architecture, frontend development, and production deployment. Every product we build is scalable, maintainable, and tested to enterprise standards.',
    benefits: [
      'Dedicated senior engineering team assigned to your product',
      'Agile delivery with two-week sprint cadence',
      'Architecture reviews at every major milestone',
      'Automated testing from day one',
      'Full source code ownership transferred at project end',
    ],
    businessValue:
      'Enterprises that partner with Accetraa for product engineering reduce time-to-market by an average of 30% compared to building an in-house team from scratch, while accessing senior-level expertise without the overhead of permanent headcount.',
    technologies: ['React', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    category: 'Infrastructure',
    overview:
      'We design cloud-native infrastructure that is secure, observable, and cost-efficient. Our cloud and DevOps service includes migration planning, infrastructure-as-code implementation, CI/CD pipeline design, container orchestration, and ongoing platform operations. We work across AWS, Azure, and GCP.',
    benefits: [
      'Cloud migration with zero production downtime',
      'Infrastructure-as-code using Terraform and Pulumi',
      'Container orchestration with Kubernetes',
      'Cost optimisation reviews included',
      'Security hardening and compliance readiness',
    ],
    businessValue:
      'Clients who move to cloud-native infrastructure with Accetraa see an average 40% reduction in infrastructure operating costs within 12 months, alongside measurable improvements in deployment frequency and incident recovery time.',
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus'],
  },
  {
    id: 'ai-automation',
    title: 'AI & Intelligent Automation',
    category: 'AI / ML',
    overview:
      'We design and implement AI-driven systems that automate high-volume processes, surface insights from complex data, and augment human decision-making. From LLM integrations and intelligent document processing to predictive analytics and recommendation engines, our AI solutions are practical, explainable, and production-ready.',
    benefits: [
      'Process automation that eliminates manual, repetitive work',
      'LLM integration for enterprise use cases',
      'Explainable AI models that build stakeholder trust',
      'MLOps pipelines for reliable model deployment',
      'Ongoing model monitoring and retraining included',
    ],
    businessValue:
      'Our AI automation clients report an average 60% reduction in manual processing time for targeted workflows within six months of deployment, with measurable improvement in accuracy and throughput.',
    technologies: ['Python', 'PyTorch', 'LangChain', 'OpenAI API', 'Hugging Face', 'FastAPI', 'MLflow', 'AWS SageMaker'],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering & Analytics',
    category: 'Data',
    overview:
      'We build the data infrastructure that modern enterprises depend on — reliable pipelines, governed data warehouses, and analytics platforms that deliver actionable insight to every level of the organisation. From real-time event streaming to historical batch processing, we handle data at any scale.',
    benefits: [
      'End-to-end data pipeline design and implementation',
      'Real-time and batch processing capabilities',
      'Data governance and lineage frameworks',
      'Business intelligence dashboards and self-service analytics',
      'Data quality monitoring and alerting',
    ],
    businessValue:
      'Organisations that invest in modern data infrastructure with Accetraa gain the ability to make data-driven decisions at every level — reducing decision latency, uncovering new revenue opportunities, and eliminating costly data quality incidents.',
    technologies: ['Apache Spark', 'dbt', 'Airflow', 'Snowflake', 'BigQuery', 'Kafka', 'Power BI', 'Metabase'],
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation Consulting',
    category: 'Consulting',
    overview:
      'We help enterprises move from legacy systems and manual processes to modern, scalable digital platforms — safely, incrementally, and with measurable business outcomes at every stage. Our consulting service combines technical depth with strategic thinking to produce a transformation roadmap that is executable, not aspirational.',
    benefits: [
      'Current-state assessment with actionable gap analysis',
      'Phased transformation roadmap with business case',
      'Vendor selection and technology evaluation support',
      'Change management and stakeholder alignment',
      'Ongoing advisory retainer options available',
    ],
    businessValue:
      'Accetraa-led digital transformation programmes consistently deliver within-budget results because we challenge scope, validate assumptions, and prioritise outcomes that create measurable business value rather than technological novelty.',
    technologies: ['Cloud Platforms', 'API-First Architecture', 'Microservices', 'Modern SaaS', 'Data Strategy', 'Security Frameworks'],
  },
];

const ChevronIcon = ({ open }) => (
  <svg
    width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
    className={`${styles.chevron} ${open ? styles['chevron--open'] : ''}`}
  >
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ServiceDetailCard = ({ service }) => {
  const [open, setOpen] = useState(false);
  const panelId = `detail-${service.id}`;
  const triggerId = `trigger-${service.id}`;

  return (
    <div className={`${styles.card} ${open ? styles['card--open'] : ''}`}>
      <button
        id={triggerId}
        type="button"
        className={styles.cardTrigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(v => !v)}
      >
        <div className={styles.cardHeader}>
          <span className={styles.category}>{service.category}</span>
          <h3 className={styles.cardTitle}>{service.title}</h3>
        </div>
        <span className={styles.toggleWrap}>
          <ChevronIcon open={open} />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`${styles.panelWrap} ${open ? styles['panelWrap--open'] : ''}`}
      >
        <div className={styles.panel}>
          <p className={styles.overview}>{service.overview}</p>

          <div className={styles.detailGrid}>
            <div className={styles.detailBlock}>
              <h4 className={styles.detailHeading}>Key Benefits</h4>
              <ul className={styles.benefitsList}>
                {service.benefits.map((b, i) => (
                  <li key={i} className={styles.benefit}>
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.detailBlock}>
              <h4 className={styles.detailHeading}>Business Value</h4>
              <p className={styles.businessValue}>{service.businessValue}</p>

              <h4 className={`${styles.detailHeading} ${styles['detailHeading--mt']}`}>Technologies Used</h4>
              <div className={styles.techTags}>
                {service.technologies.map(tech => (
                  <span key={tech} className={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.checkIcon}>
    <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.12"/>
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ServiceDetails = () => (
  <section className={styles.section} aria-label="Service details">
    <div className="container">
      <SectionHeader
        eyebrow="Service Details"
        title="Depth behind every service we offer"
        subtitle="Expand any service below to explore the full scope — what we do, what you gain, and the technologies we use."
        align="center"
        className={styles.header}
      />

      <div className={styles.list}>
        {SERVICES.map(service => (
          <ServiceDetailCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  </section>
);

export default ServiceDetails;
