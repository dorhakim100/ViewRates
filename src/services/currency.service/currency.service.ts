import axios from 'axios'

const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY
console.log(apiKey)

export async function getExchangeRates(base: string, symbols: string[]) {
  const url = `https://api.exchangerate.host/live`
  const params = {
    access_key: apiKey,
    base,
    symbols: symbols.join(','),
  }

  try {
    const res = await axios.get(url, { params })
    const { quotes } = res.data
    const updatedSymbols = symbols.map((symbol) => {
      symbol = base + symbol
      return symbol.toUpperCase()
    })
    console.log('updatedSymbols:', updatedSymbols)
    console.log(quotes)

    const rates = updatedSymbols.map((symbol) => {
      return {
        multiply: quotes[symbol],
        name: symbol,
      }
    })
    console.log(rates)

    return rates
  } catch (err) {
    console.error('Failed to fetch exchange rates:', err)
    throw err
  }
}
