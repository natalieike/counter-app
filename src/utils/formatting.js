// formats the price to 2 decimal places
// input is a string, returns a string
export const formatPrice = (price) => {
  const decimalIndex = price.indexOf('.')

  if (decimalIndex === -1) {
    return `${price}.00`
  }

  if (price.slice(decimalIndex + 1).length < 2) {
    return `${price}${'0'.repeat(2 - price.slice(decimalIndex + 1).length)}`
  }

  return price
}
