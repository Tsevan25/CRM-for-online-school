import type { PropsWithChildren } from 'react'
import { Spinner, ErrorMessage } from '@/shared/ui'


interface AsyncBoundaryProps extends PropsWithChildren {
  loading: boolean
  error?: string | null
}

const AsyncBoundary = ({ loading, error, children }: AsyncBoundaryProps) => {
  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  return <>{children}</>
}

export default AsyncBoundary