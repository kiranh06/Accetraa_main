import styles from './Card.module.scss';

// ─── Base Card ────────────────────────────────────────────────────────────────

const Card = ({ children, variant = 'default', hoverable = false, className = '', ...props }) => {
  const classes = [
    styles.card,
    styles[`card--${variant}`],
    hoverable ? styles['card--hoverable'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// ─── Service Card ─────────────────────────────────────────────────────────────

export const ServiceCard = ({ icon, eyebrow, title, description, href, className = '' }) => (
  <Card variant="service" hoverable className={className}>
    {icon && <div className={styles.serviceIcon}>{icon}</div>}
    {eyebrow && <span className={styles.serviceEyebrow}>{eyebrow}</span>}
    <h3 className={styles.serviceTitle}>{title}</h3>
    {description && <p className={styles.serviceDesc}>{description}</p>}
    {href && (
      <a href={href} className={styles.serviceLink} aria-label={`Learn more about ${title}`}>
        Learn more
        <span aria-hidden="true"> →</span>
      </a>
    )}
  </Card>
);

// ─── Portfolio Card ───────────────────────────────────────────────────────────

export const PortfolioCard = ({ image, category, title, description, href, className = '' }) => (
  <Card variant="portfolio" hoverable className={className}>
    <div className={styles.portfolioImageWrapper}>
      {image
        ? <img src={image} alt={title} className={styles.portfolioImage} loading="lazy" />
        : <div className={styles.portfolioImagePlaceholder} aria-hidden="true" />
      }
      {category && <span className={styles.portfolioCategory}>{category}</span>}
    </div>
    <div className={styles.portfolioContent}>
      <h3 className={styles.portfolioTitle}>{title}</h3>
      {description && <p className={styles.portfolioDesc}>{description}</p>}
      {href && (
        <a href={href} className={styles.portfolioLink}>
          View case study <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  </Card>
);

// ─── Product Card ─────────────────────────────────────────────────────────────

export const ProductCard = ({ icon, badge, title, description, features = [], href, className = '' }) => (
  <Card variant="product" hoverable className={className}>
    <div className={styles.productHeader}>
      {icon && <div className={styles.productIcon}>{icon}</div>}
      {badge && <span className={styles.productBadge}>{badge}</span>}
    </div>
    <h3 className={styles.productTitle}>{title}</h3>
    {description && <p className={styles.productDesc}>{description}</p>}
    {features.length > 0 && (
      <ul className={styles.productFeatures}>
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    )}
    {href && (
      <a href={href} className={styles.productLink}>
        Explore product <span aria-hidden="true">→</span>
      </a>
    )}
  </Card>
);

export default Card;
