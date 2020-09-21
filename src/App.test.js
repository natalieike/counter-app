import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('App tests', () => {
  it('renders form and empty list', () => {
    const { getByLabelText, queryAllByTestId, getByText } = render(<App />)

    const nameInput = getByLabelText(/name/i)
    expect(nameInput).toBeInTheDocument()

    const priceInput = getByLabelText(/price/i)
    expect(priceInput).toBeInTheDocument()

    const buttonIncrement = queryAllByTestId('btn-increment')
    expect(buttonIncrement).toEqual([])

    const buttonDecrement = queryAllByTestId('btn-decrement')
    expect(buttonDecrement).toEqual([])

    expect(getByText('Checkout')).toBeDisabled()
  })

  it('input will add to the list', () => {
    const { getByLabelText, queryAllByTestId, getByText } = render(<App />)

    const nameInput = getByLabelText(/name/i)
    userEvent.type(nameInput, 'name')

    const priceInput = getByLabelText(/price/i)
    userEvent.type(priceInput, '123')

    const submitBtn = getByText('Submit')
    userEvent.click(submitBtn)

    const buttonIncrement = queryAllByTestId('btn-increment')
    expect(buttonIncrement.length).toEqual(1)

    const buttonDecrement = queryAllByTestId('btn-decrement')
    expect(buttonDecrement.length).toEqual(1)

    expect(getByText('Checkout')).not.toBeDisabled()
  })

  it('click Checkout, and then click Done to re-set back to the input screen', () => {
    const { getByText, getByLabelText, queryAllByTestId } = render(<App />)
    const checkoutBtn = getByText('Checkout')
    expect(checkoutBtn).not.toBeDisabled()

    userEvent.click(checkoutBtn)

    expect(getByText(/thank you for your purchase/i)).toBeInTheDocument()
    const doneBtn = getByText('Done')
    expect(doneBtn).not.toBeDisabled()

    userEvent.click(doneBtn)

    const nameInput = getByLabelText(/name/i)
    expect(nameInput).toBeInTheDocument()

    const priceInput = getByLabelText(/price/i)
    expect(priceInput).toBeInTheDocument()

    const buttonIncrement = queryAllByTestId('btn-increment')
    expect(buttonIncrement).toEqual([])

    const buttonDecrement = queryAllByTestId('btn-decrement')
    expect(buttonDecrement).toEqual([])

    expect(getByText('Checkout')).toBeDisabled()
  })
})
