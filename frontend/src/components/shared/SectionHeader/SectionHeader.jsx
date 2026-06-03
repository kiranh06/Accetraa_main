import styles from './SectionHeader.module.scss';

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = '',
}) => {
  const classes = [
    styles.header,
    styles[`header--${align}`],
    styles[`header--${theme}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
