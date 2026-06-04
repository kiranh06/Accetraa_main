import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { getPortfolioFeatured } from '@/services/portfolio';
import { PortfolioCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/shared/SectionHeader';
import PortfolioModal from '@/components/shared/PortfolioModal';
import { asString } from '@/utils/formatters';
import styles from './FeaturedProjects.module.scss';

const toArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

const FeaturedProjects = () => {
  const { data, loading, error, refetch } = useFetch(getPortfolioFeatured);
  const items = toArray(data);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className={styles.section} aria-label="Featured projects">
      <div className="container">
        <SectionHeader
          eyebrow="Featured Work"
          title="Projects that define our capabilities"
          subtitle="Hand-picked case studies that demonstrate the depth of our engineering and the scale of impact we deliver for enterprise clients."
          align="center"
          theme="dark"
          className={styles.header}
        />

        {loading && (
          <div className={styles.grid} aria-busy="true">
            {Array.from({ length: 3 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && !loading && (
          <div className={styles.stateBox} role="alert">
            <p className={styles.stateText}>Featured projects could not be loaded.</p>
            {import.meta.env.DEV && (
              <code className={styles.devError}>{error}</code>
            )}
            <button type="button" className={styles.retryBtn} onClick={refetch}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className={styles.grid}>
            {items.map((item) => (
              <button
                key={item.id ?? item.slug ?? item.title}
                type="button"
                className={styles.cardBtn}
                onClick={() => setSelectedItem(item)}
                aria-label={`View details for ${asString(item.title ?? item.name)}`}
              >
                <PortfolioCard
                  category={asString(item.category ?? item.industry)}
                  title={asString(item.title ?? item.name)}
                  description={asString(item.description ?? item.summary)}
                  image={item.image ?? item.thumbnail ?? null}
                />
              </button>
            ))}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className={styles.stateBox}>
            <p className={styles.stateText}>Featured projects coming soon.</p>
          </div>
        )}
      </div>

      <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default FeaturedProjects;
