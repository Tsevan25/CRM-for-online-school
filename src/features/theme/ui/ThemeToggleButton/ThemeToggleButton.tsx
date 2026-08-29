import { Button } from '@/shared/ui'
import { useTheme } from '../../model/useTheme'
import { SunMedium, Moon } from 'lucide-react'


export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="icon" size="small" onClick={toggleTheme}>
      {theme === 'light' ? <SunMedium /> : <Moon /> }
    </Button>
  )
}