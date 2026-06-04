import { useState, useMemo } from 'react';
import useFetch from '@/hooks/useFetch';
import { getPortfolio, getPortfolioCategories } from '@/services/portfolio';
import { PortfolioCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import SectionHeader from '@/components/shared/SectionHeader';
import PortfolioModal from '@/components/shared/PortfolioModal';
import { asString } from '@/utils/formatters';
import styles from './PortfolioShowcase.module.scss';

const toArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};

const normaliseCategory = (raw) => asString(raw);

const PortfolioShowcase = () => {
  const { data: portfolioData, loading: portfolioLoading, error: portfolioError, refetch } = useFetch(getPortfolio);
  const { data: catData } = useFetch(getPortfolioCategories);

  const allItems  = toArray(portfolioData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null); // null = All

  // Build category list from API or derive from items as fallback
  const categories = useMemo(() => {
    const fromApi = toArray(catData).map(normaliseCategory).filter(Boolean);
    if (fromApi.length > 0) return fromApi;
    // Derive from items
    const set = new Set(allItems.map(i => normaliseCategory(i.category ?? i.industry)).filter(Boolean));
    return Array.from(set);
  }, [catData, allItems]);

  const filteredItems = useMemo(() => {
    if (!activeFilter) return allItems;
    return allItems.filter(
      item => normaliseCategory(item.category ?? item.industry) === activeFilter
    );
  }, [allItems, activeFilter]);

  return (
    <section className={styles.section} aria-label="Full portfolio">
      <div className="container">
        <SectionHeader
          eyebrow="All Projects"
          title="The full picture of our delivery"
          subtitle="Browse every project in our portfolio. Use the filters below to explore by category."
          align="center"
          className={styles.header}
        />

        {/* Category filter bar — only shown when there are categories */}
        {categories.length > 0 && !portfolioLoading && (
          <div className={styles.filterBar} role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === null ? styles['filterBtn--active'] : ''}`}
              onClick={() => setActiveFilter(null)}
              aria-pressed={activeFilter === null}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`${styles.filterBtn} ${activeFilter === cat ? styles['filterBtn--active'] : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {portfolioLoading && (
          <div className={styles.grid} aria-busy="true" aria-label="Loading projects">
            {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {portfolioError && !portfolioLoading && (
          <div className={styles.feedback} role="alert">
            <p className={styles.feedbackTitle}>Portfolio could not be loaded</p>
            {import.meta.env.DEV && (
              <code className={styles.devError}>{portfolioError}</code>
            )}
            <button type="button" className={styles.retryBtn} onClick={refetch}>
              Retry
            </button>
          </div>
        )}

        {/* Empty — no items at all */}
        {!portfolioLoading && !portfolioError && allItems.length === 0 && (
          <div className={styles.feedback}>
            <p className={styles.feedbackTitle}>Portfolio projects coming soon</p>
            <p className={styles.feedbackBody}>Our case studies are being prepared for publication.</p>
          </div>
        )}

        {/* Empty filter result */}
        {!portfolioLoading && !portfolioError && allItems.length > 0 && filteredItems.length === 0 && (
          <div className={styles.feedback}>
            <p className={styles.feedbackTitle}>No projects in this category</p>
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => setActiveFilter(null)}
            >
              Show all projects
            </button>
          </div>
        )}

        {/* Grid */}
        {!portfolioLoading && !portfolioError && filteredItems.length > 0 && (
          <>
            <p className={styles.resultCount} aria-live="polite">
              {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}
              {activeFilter ? ` in ${activeFilter}` : ''}
            </p>
            <div className={styles.grid}>
              {filteredItems.map((item) => (
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
          </>
        )}
      </div>

      <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default PortfolioShowcase;
