import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './Typography.module.css'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption'

interface TypographyProps extends PropsWithChildren {
  variant?: TypographyVariant
  className?: string
}

const Typography = ({
  variant = 'body',
  className,
  children,
}: TypographyProps) => {
  const classes = clsx(styles[variant], className)

  switch (variant) {
    case 'h1':
      return <h1 className={classes}>{children}</h1>
    case 'h2':
      return <h2 className={classes}>{children}</h2>
    case 'h3':
      return <h3 className={classes}>{children}</h3>
    case 'caption':
      return <span className={classes}>{children}</span>
    case 'body':
    default:
      return <p className={classes}>{children}</p>
  }
}

export default Typography