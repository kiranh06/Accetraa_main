import styles from './Skeleton.module.scss';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
  const style = {
    width: width || '100%',
    height: height || '1rem',
    borderRadius: borderRadius || '4px',
  };

  return <div className={`${styles.skeleton} ${className}`} style={style} aria-hidden="true" />;
};

export const SkeletonCard = () => (
  <div className={styles.card}>
    <Skeleton height="200px" borderRadius="8px" />
    <Skeleton width="70%" height="1.25rem" />
    <Skeleton height="0.875rem" />
    <Skeleton width="85%" height="0.875rem" />
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className={styles.text}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton key={i} width={i === lines - 1 ? '65%' : '100%'} height="0.875rem" />
    ))}
  </div>
);

export default Skeleton;
