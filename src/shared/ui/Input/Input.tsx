import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string
  labelClassName?: string 
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, labelClassName, id, ...rest }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={clsx(styles.label, labelClassName)}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(styles.input, error && styles.inputError, className)}
          aria-invalid={!!error}
          {...rest}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input;