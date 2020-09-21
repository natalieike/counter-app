import { formatPrice } from './formatting'

describe('formatPrice', () => {
  it('returns the input if it is already in xx.xx format', () => {
    const input = '12.34'
    const result = formatPrice(input)

    expect(result).toEqual(input)
  })

  it('returns xx.00 if input is xx', () => {
    const input = '12'
    const result = formatPrice(input)

    expect(result).toEqual('12.00')
  })

  it('returns xx.x0 if input is xx.x', () => {
    const input = '12.3'
    const result = formatPrice(input)

    expect(result).toEqual('12.30')
  })
})
