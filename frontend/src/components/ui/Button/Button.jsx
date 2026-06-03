import styles from './Button.module.scss';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  fullWidth = false,
  as: Tag = 'button',
  className = '',
  onClick,
  ...props
}) => {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    fullWidth ? styles['btn--full'] : '',
    loading ? styles['btn--loading'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      type={Tag === 'button' ? type : undefined}
      className={classes}
      disabled={Tag === 'button' ? disabled || loading : undefined}
      aria-busy={loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </Tag>
  );
};

export default Button;
