import React from 'react'

const Totals = (props) => {
  // the checkout button controls whether the user goes to the checkout (reciept) page
  // if true, the user gets a green Checkout button and clicking takes them to the reciept page
  // if flase, the user gets a grey Done button, and clicking re-sets everything and takes them to the entry page
  const { counters, checkoutButton, onSetCheckout } = props

  let totalCount = 0
  let totalPrice = 0

  counters.forEach((counter) => {
    totalCount += counter.value
    totalPrice += counter.value * counter.price
  })

  return (
    <div className="row">
      <div className="col-md-4">
        <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
          Total:
        </span>
      </div>

      <div className="col-md-2 text-right">
        <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
          $ {totalPrice.toFixed(2)}
        </span>
      </div>

      <div className="col-md-2 text-right">
        <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
          {totalCount}
        </span>
      </div>

      <div className="col-md-2">
        <button
          className={`btn btn-${checkoutButton ? 'success' : 'secondary'}`}
          onClick={() => onSetCheckout(checkoutButton)}
          disabled={checkoutButton && totalCount < 1}
        >
          {checkoutButton ? 'Checkout' : 'Done'}
        </button>
      </div>
    </div>
  )
}

export default Totals
