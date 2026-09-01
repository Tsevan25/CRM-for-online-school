import { Button } from '@/shared/ui';
import styles from './CalendarToolbar.module.css';

interface CalendarToolbarProps {
  view: 'month' | 'day';
  onViewChange: (view: 'month' | 'day') => void;
  onNavigate: (action: 'today' | 'back' | 'next') => void;
}

export const CalendarToolbar = ({ view, onViewChange, onNavigate }: CalendarToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.navButtons}>
        <Button variant="secondary" size="small" onClick={() => onNavigate('today')}>
          Today
        </Button>
        <Button variant="secondary" size="small" onClick={() => onNavigate('back')}>
          Back
        </Button>
        <Button variant="secondary" size="small" onClick={() => onNavigate('next')}>
          Next
        </Button>
      </div>
      <div className={styles.viewButtons}>
        <Button
          variant={view === 'month' ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onViewChange('month')}
        >
          Month
        </Button>
        <Button
          variant={view === 'day' ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onViewChange('day')}
        >
          Day
        </Button>
      </div>
    </div>
  );
};