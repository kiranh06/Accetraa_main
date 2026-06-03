import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { getProducts } from '@/services/products';
import { ProductCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { asString, toStringArray } from '@/utils/formatters';
import styles from './ProductsPreview.module.scss';

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

const ProductsPreview = () => {
  const { data, loading, error, refetch } = useFetch(getProducts);
  const products = toArray(data).slice(0, 3);

  return (
    <section className={styles.section} aria-label="Our Products">
      <div className="container">
        <div className={styles.header}>
          <SectionHeader
            eyebrow="Our Products"
            title="Technology products built for enterprise"
            subtitle="Purpose-built software platforms solving real operational challenges for modern enterprises."
            align="left"
          />
          <div className={styles.headerAction}>
            <Button as={Link} to={ROUTES.PORTFOLIO} variant="outline" size="md">
              All Products →
            </Button>
          </div>
        </div>

        {loading && <SkeletonGrid />}

        {error && !loading && (
          <div className={styles.stateBox} role="alert">
            <p>Products could not be loaded.</p>
            {import.meta.env.DEV && error && (
              <code className={styles.devError}>{error}</code>
            )}
            <Button variant="ghost" size="sm" onClick={refetch}>Retry</Button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id ?? product.slug ?? product.name}
                badge={asString(product.badge ?? product.tag)}
                title={asString(product.name ?? product.title)}
                description={asString(product.description)}
                features={toStringArray(product.features ?? product.highlights)}
                href={ROUTES.PORTFOLIO}
              />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className={styles.stateBox}>
            <p>Product listings coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPreview;
