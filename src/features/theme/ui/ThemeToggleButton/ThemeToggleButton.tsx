import { Button } from '@/shared/ui'
import { useTheme } from '../../model/useTheme'

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="secondary" size="small" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}