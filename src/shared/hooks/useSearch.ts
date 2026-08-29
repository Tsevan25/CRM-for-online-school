import { useState, useMemo } from 'react'

export function useSearch<T>(
  data: T[],
  getSearchableText: (item: T) => string
) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data
    const term = searchTerm.toLowerCase()
    return data.filter((item) =>
      getSearchableText(item).toLowerCase().includes(term)
    )
  }, [data, searchTerm, getSearchableText])

  return { searchTerm, setSearchTerm, filteredData }
}