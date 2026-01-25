import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helpText, error, id, className, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={styles.fieldWrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${styles.input} ${className || ''}`}
          {...props}
        />
        {helpText && !error && (
          <p className={styles.helpText}>{helpText}</p>
        )}
        {error && (
          <p className={styles.errorText}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
