import React from 'react'

import Totals from './totals'

import { formatPrice } from '../utils/formatting'

const Checkout = (props) => {
  const { counters, onSetCheckout } = props

  return (
    <div>
      <div className="jumbotron">
        <h1>Thank you for your purchase</h1>
        <p className="lead">Your order summary is below</p>
      </div>

      <div className="row">
        <div className="col-md-4">
          <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
            Item name
          </span>
        </div>
        <div className="col-md-2 text-right">
          <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
            Price
          </span>
        </div>
        <div className="col-md-2 text-right">
          <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
            Quantity
          </span>
        </div>
      </div>

      {counters.map((counter) => (
        <div className="row" key={counter.id}>
          <div className="col-md-4  text-truncate">
            <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
              {counter.name}
            </span>
          </div>
          <div className="col-md-2 text-right">
            <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
              $ {formatPrice(counter.price)}
            </span>
          </div>
          <div className="col-md-2 text-right">
            <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
              {counter.value}
            </span>
          </div>
        </div>
      ))}

      <hr />

      <div>
        <Totals
          counters={counters}
          checkoutButton={false}
          onSetCheckout={onSetCheckout}
        />
      </div>
    </div>
  )
}

export default Checkout
