import type { ReactNode } from 'react'
import styles from './DataTable.module.css'

export interface Column<T> {
  key: string
  header: string
  render: (item: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField?: keyof T
}

const DataTable = <T,>({
  columns,
  data,
  keyField = 'id' as keyof T,
}: DataTableProps<T>) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headRow}>
          {columns.map((col) => (
            <th key={col.key} className={styles.headCell}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={String(item[keyField])} className={styles.row}>
            {columns.map((col) => (
              <td key={col.key} className={styles.cell}>
                {col.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable