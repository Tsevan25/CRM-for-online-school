export const formatCurrency = (
  value: number | string | readonly (string | number)[] | undefined
): string => {
  const raw = Array.isArray(value) ? value[0] : value
  const num = Number(raw ?? 0)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(num)
}