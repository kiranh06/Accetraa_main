import useFetch from '@/hooks/useFetch';
import { getServices } from '@/services/services';
import { ServiceCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';
import { asString } from '@/utils/formatters';
import styles from './ServicesGrid.module.scss';

const toArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

const LoadingState = () => (
  <div className={styles.grid} aria-busy="true" aria-label="Loading services">
    {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className={styles.feedback} role="alert">
    <div className={styles.feedbackIcon} aria-hidden="true">
      <AlertIcon />
    </div>
    <h3 className={styles.feedbackTitle}>Services could not be loaded</h3>
    <p className={styles.feedbackBody}>
      There was a problem retrieving the services list. Please try again.
    </p>
    {import.meta.env.DEV && message && (
      <code className={styles.devError}>{message}</code>
    )}
    <Button variant="primary" size="md" onClick={onRetry}>Retry</Button>
  </div>
);

const EmptyState = () => (
  <div className={styles.feedback}>
    <div className={styles.feedbackIcon} aria-hidden="true">
      <EmptyIcon />
    </div>
    <h3 className={styles.feedbackTitle}>No services listed yet</h3>
    <p className={styles.feedbackBody}>
      Our full service catalogue is being updated. In the meantime, contact us directly to
      discuss how we can help your organisation.
    </p>
    <Button variant="primary" size="md" as="a" href="/contact">
      Get in Touch
    </Button>
  </div>
);

const ServicesGrid = () => {
  const { data, loading, error, refetch } = useFetch(getServices);
  const services = toArray(data);

  return (
    <section className={styles.section} aria-label="All services" id="services-grid">
      <div className="container">
        <SectionHeader
          eyebrow="Our Services"
          title="Everything your enterprise needs to build and scale"
          subtitle="Browse our full catalogue of technology services. Each engagement is scoped to your specific requirements — no fixed packages, no unnecessary scope."
          align="center"
          className={styles.header}
        />

        {loading && <LoadingState />}

        {error && !loading && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && services.length > 0 && (
          <div className={styles.grid}>
            {services.map((svc) => (
              <ServiceCard
                key={svc.id ?? svc.slug ?? svc.name}
                eyebrow={asString(svc.category ?? svc.type) || 'Service'}
                title={asString(svc.name ?? svc.title)}
                description={asString(svc.description ?? svc.short_description)}
              />
            ))}
          </div>
        )}

        {!loading && !error && services.length === 0 && <EmptyState />}
      </div>
    </section>
  );
};

const AlertIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M16 9v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="22" r="1.25" fill="currentColor"/>
  </svg>
);

const EmptyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="5" y="8" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M5 13h22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M11 19h10M11 23h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <path d="M11 6V4M21 6V4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

export default ServicesGrid;
