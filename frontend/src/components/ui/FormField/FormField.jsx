import styles from './FormField.module.scss';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  success,
  disabled = false,
  required = false,
  rows = 4,
  options = [],
  helperText,
  className = '',
}) => {
  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const helpId  = `${fieldId}-help`;

  const wrapperClasses = [
    styles.field,
    error   ? styles['field--error']   : '',
    success ? styles['field--success'] : '',
    disabled ? styles['field--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    styles.input,
    type === 'textarea' ? styles.textarea : '',
    type === 'select'   ? styles.select   : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    id:           fieldId,
    name,
    value,
    onChange,
    onBlur,
    disabled,
    required,
    placeholder,
    className:    inputClasses,
    'aria-invalid': !!error,
    'aria-describedby': [error ? errorId : null, helperText ? helpId : null]
      .filter(Boolean)
      .join(' ') || undefined,
  };

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}

      {type === 'textarea' && (
        <textarea rows={rows} {...sharedProps} />
      )}

      {type === 'select' && (
        <div className={styles.selectWrapper}>
          <select {...sharedProps}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(({ value: v, label: l }) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <span className={styles.selectArrow} aria-hidden="true">▾</span>
        </div>
      )}

      {type !== 'textarea' && type !== 'select' && (
        <input type={type} {...sharedProps} />
      )}

      {error && (
        <p id={errorId} className={styles.errorMsg} role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helpId} className={styles.helper}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
