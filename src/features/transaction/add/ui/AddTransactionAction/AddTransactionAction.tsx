import { useState } from 'react'
import { Button } from '@/shared/ui'
import { AddTransactionModal } from '../AddTransactionModal/AddTransactionModal'

interface AddTransactionActionProps {
  onSuccess?: () => void
}

export const AddTransactionAction = ({ onSuccess }: AddTransactionActionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="primary" size="small" onClick={() => setIsOpen(true)}>
        + Add Transaction
      </Button>
      <AddTransactionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  )
}