import styles from './Loader.module.scss';

const Loader = ({ fullPage = false }) => (
  <div className={`${styles.wrapper} ${fullPage ? styles.fullPage : ''}`} role="status" aria-label="Loading">
    <div className={styles.spinner} />
  </div>
);

export default Loader;
