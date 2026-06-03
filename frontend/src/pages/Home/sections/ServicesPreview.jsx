import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { getServices } from '@/services/services';
import { ServiceCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { asString } from '@/utils/formatters';
import styles from './ServicesPreview.module.scss';

// Handle both paginated { results: [...] } and flat array responses
const toArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

const SkeletonGrid = () => (
  <div className={styles.grid}>
    {Array.from({ length: 3 }, (_, i) => <SkeletonCard key={i} />)}
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className={styles.errorState} role="alert">
    <p>Services could not be loaded.</p>
    {import.meta.env.DEV && message && (
      <code className={styles.devError}>{message}</code>
    )}
    <Button variant="ghost" size="sm" onClick={onRetry}>Retry</Button>
  </div>
);

const ServicesPreview = () => {
  const { data, loading, error, refetch } = useFetch(getServices);
  const services = toArray(data).slice(0, 3);

  return (
    <section className={styles.section} aria-label="Services">
      <div className="container">
        <div className={styles.header}>
          <SectionHeader
            eyebrow="What We Build"
            title="Services that scale with you"
            subtitle="From initial architecture to full-scale deployment, we deliver across the complete engineering lifecycle."
            align="left"
          />
          <div className={styles.headerAction}>
            <Button as={Link} to={ROUTES.SERVICES} variant="outline" size="md">
              All Services →
            </Button>
          </div>
        </div>

        {loading && <SkeletonGrid />}

        {error && !loading && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && services.length > 0 && (
          <div className={styles.grid}>
            {services.map((svc) => (
              <ServiceCard
                key={svc.id ?? svc.slug ?? svc.name}
                eyebrow={asString(svc.category ?? svc.type) || 'Service'}
                title={asString(svc.name ?? svc.title)}
                description={asString(svc.description)}
                href={ROUTES.SERVICES}
              />
            ))}
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className={styles.emptyState}>
            <p>No services available at this time.</p>
            <Button as={Link} to={ROUTES.SERVICES} variant="outline" size="md">
              View Services Page
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPreview;
