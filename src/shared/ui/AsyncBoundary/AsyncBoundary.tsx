import type { PropsWithChildren } from 'react'
import { Spinner, ErrorMessage } from '@/shared/ui'


interface AsyncBoundaryProps extends PropsWithChildren {
  loading: boolean
  error?: string | null
}

export const AsyncBoundary = ({ loading, error, children }: AsyncBoundaryProps) => {
  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  return <>{children}</>
}

