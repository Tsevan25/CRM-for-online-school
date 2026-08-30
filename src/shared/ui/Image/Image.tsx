import { useState } from 'react'
import clsx from 'clsx'
import styles from './Image.module.css'

interface ImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  loading?: 'lazy' | 'eager'
}

export const Image = ({
  src,
  alt,
  className,
  fallbackSrc,
  loading = 'lazy',
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
    }
  }

  return (
    <img
      className={clsx(styles.image, className)}
      src={currentSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
    />
  )
}

