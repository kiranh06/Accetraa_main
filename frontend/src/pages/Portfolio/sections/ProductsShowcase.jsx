import useFetch from '@/hooks/useFetch';
import { getProducts } from '@/services/products';
import { ProductCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';
import { asString, toStringArray } from '@/utils/formatters';
import styles from './ProductsShowcase.module.scss';

const toArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

const LoadingGrid = () => (
  <div className={styles.grid} aria-busy="true" aria-label="Loading products">
    {Array.from({ length: 3 }, (_, i) => <SkeletonCard key={i} />)}
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className={styles.feedback} role="alert">
    <p className={styles.feedbackTitle}>Products could not be loaded</p>
    {import.meta.env.DEV && message && (
      <code className={styles.devError}>{message}</code>
    )}
    <Button variant="primary" size="sm" onClick={onRetry}>Retry</Button>
  </div>
);

const EmptyState = () => (
  <div className={styles.feedback}>
    <p className={styles.feedbackTitle}>Product catalogue coming soon</p>
    <p className={styles.feedbackBody}>
      Our proprietary products are being prepared for showcase. Contact us to learn more.
    </p>
  </div>
);

const ProductsShowcase = () => {
  const { data, loading, error, refetch } = useFetch(getProducts);
  const products = toArray(data);

  return (
    <section className={styles.section} aria-label="Products">
      <div className="container">
        <SectionHeader
          eyebrow="Our Products"
          title="Proprietary platforms and enterprise products"
          subtitle="Accetraa builds and maintains a suite of enterprise products that we offer as standalone solutions or as the foundation for client-specific customisations."
          align="center"
          className={styles.header}
        />

        {loading && <LoadingGrid />}

        {error && !loading && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && products.length > 0 && (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id ?? product.slug ?? product.name}
                badge={asString(product.badge ?? product.status ?? '')}
                title={asString(product.name ?? product.title)}
                description={asString(product.description ?? product.tagline ?? product.short_description)}
                features={toStringArray(product.features ?? product.key_features ?? product.highlights)}
                href={product.url ?? product.demo_url ?? product.link ?? '#'}
              />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && <EmptyState />}
      </div>
    </section>
  );
};

export default ProductsShowcase;
