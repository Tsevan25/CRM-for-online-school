import { forwardRef } from 'react'
import {FormField} from '@/shared/ui'
import styles from './Select.module.css'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, ...rest }, ref) => {
    return (
      <FormField label={label} error={error}>
        <select className={styles.select} ref={ref} {...rest}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    )
  }
)

Select.displayName = 'Select'

