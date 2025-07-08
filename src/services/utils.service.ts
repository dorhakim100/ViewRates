export function formatNumberToString(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function getDefaultCurrency() {
  const multiply = 0.29
  return {
    amount: 1,
    currency: 'usd',
    multiply: multiply,
  }
}
