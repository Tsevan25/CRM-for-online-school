import Card from "../Card"
import styles from './StatCard.module.css'

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: string;
    description: string;
}

const StatCard = ({title, value, icon, description}: StatCardProps) => {
    return (
        <Card padding='medium' className={styles.card}>
            {icon && <span className={styles.icon}>{icon}</span>}
            <div className={styles.body}>
                <span className={styles.title}>{title}</span>
                <span className={styles.value}>{value}</span>
                {description && <span className={styles.description}>{description}</span>}
            </div>
        </Card>
    )
}

export default StatCard;