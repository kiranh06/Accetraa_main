import { Link } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { getPortfolioFeatured } from '@/services/portfolio';
import { PortfolioCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { asString } from '@/utils/formatters';
import styles from './PortfolioHighlights.module.scss';

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

const PortfolioHighlights = () => {
  const { data, loading, error, refetch } = useFetch(getPortfolioFeatured);
  const items = toArray(data).slice(0, 3);

  return (
    <section className={styles.section} aria-label="Portfolio highlights">
      <div className="container">
        <div className={styles.header}>
          <SectionHeader
            eyebrow="Our Work"
            title="Outcomes we're proud of"
            subtitle="A selection of featured projects across industries — each one a testament to what focused engineering delivers."
            align="left"
            theme="dark"
          />
          <div className={styles.headerAction}>
            <Button as={Link} to={ROUTES.PORTFOLIO} variant="outline" size="md" className={styles.outlineLight}>
              Full Portfolio →
            </Button>
          </div>
        </div>

        {loading && <SkeletonGrid />}

        {error && !loading && (
          <div className={styles.stateBox} role="alert">
            <p>Portfolio could not be loaded.</p>
            {import.meta.env.DEV && error && (
              <code className={styles.devError}>{error}</code>
            )}
            <Button variant="ghost" size="sm" onClick={refetch} className={styles.ghostLight}>
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className={styles.grid}>
            {items.map((item) => (
              <PortfolioCard
                key={item.id ?? item.slug ?? item.title}
                category={asString(item.category ?? item.industry)}
                title={asString(item.title ?? item.name)}
                description={asString(item.description ?? item.summary)}
                image={item.image ?? item.thumbnail ?? null}
                href={ROUTES.PORTFOLIO}
              />
            ))}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className={styles.stateBox}>
            <p>Featured projects coming soon.</p>
            <Button as={Link} to={ROUTES.PORTFOLIO} variant="ghost" size="sm" className={styles.ghostLight}>
              Browse Portfolio
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioHighlights;
