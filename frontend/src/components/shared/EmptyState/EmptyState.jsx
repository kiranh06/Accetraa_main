import styles from './EmptyState.module.scss';

// icon:    ReactNode — optional illustration/icon
// title:   string
// body:    string — optional supporting text
// action:  ReactNode — optional button / link
const EmptyState = ({ icon, title, body, action, className = '' }) => (
  <div className={`${styles.wrap} ${className}`} role="status">
    {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
    <h3 className={styles.title}>{title}</h3>
    {body && <p className={styles.body}>{body}</p>}
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

export default EmptyState;
