import axios from 'axios'

const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY

export async function getExchangeRates(base: string, symbols: string[]) {
  const url = `https://api.exchangerate.host/live`
  const params = {
    access_key: apiKey,
    source: base,
    symbols: symbols.join(','),
  }

  try {
    // const res = await axios.get(url, { params })
    // const { quotes } = res.data
    let rates
    const updatedSymbols = symbols.map((symbol) => {
      symbol = base + symbol
      return symbol.toUpperCase()
    })
    if (true) {
      // if (!res.data.success) {
      rates = updatedSymbols.map((symbol) => {
        return {
          multiply: _getRandomMultiply(),
          name: symbol,
        }
      })
    } else {
      rates = updatedSymbols.map((symbol) => {
        return {
          multiply: quotes[symbol],
          name: symbol,
        }
      })
    }
    return rates
  } catch (err) {
    console.error('Failed to fetch exchange rates:', err)
    throw err
  }
}

function _getRandomMultiply(min = 0.1, max = 5.0): number {
  const random = Math.random() * (max - min) + min
  return +random.toFixed(2)
}
