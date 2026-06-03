import styles from './TestimonialCard.module.scss';

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1l1.9 3.8 4.2.6-3 2.9.7 4.2L8 10.4l-3.8 2 .7-4.2-3-2.9 4.2-.6z" />
  </svg>
);

const TestimonialCard = ({
  quote,
  author,
  title,
  company,
  rating = 5,
  className = '',
}) => (
  <article className={`${styles.card} ${className}`}>
    <div className={styles.stars} aria-label={`Rated ${rating} out of 5`} role="img">
      {Array.from({ length: rating }, (_, i) => <StarIcon key={i} />)}
    </div>

    <blockquote className={styles.blockquote}>
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
    </blockquote>

    <footer className={styles.footer}>
      <div className={styles.avatar} aria-hidden="true">
        {author.charAt(0).toUpperCase()}
      </div>
      <div className={styles.meta}>
        <cite className={styles.author}>{author}</cite>
        <p className={styles.role}>{title}, <strong>{company}</strong></p>
      </div>
    </footer>
  </article>
);

export default TestimonialCard;
