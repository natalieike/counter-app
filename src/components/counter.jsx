import React, { Component } from 'react'

import { formatPrice } from '../utils/formatting'

class Counter extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 text-truncate">
            <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
              {this.props.counter.name}
            </span>
          </div>
          <div className="col-md-2 text-right">
            <span style={{ fontSize: 24 }} className="badge m-2 align-middle">
              $ {formatPrice(this.props.counter.price)}
            </span>
          </div>
          <div className="col-md-2 text-right">
            <span style={{ fontSize: 24 }} className={this.getBadgeClasses()}>
              {this.props.counter.value}
            </span>
          </div>
          <div className="col-md-4">
            <button
              datatestid="btn-increment"
              className="btn btn-secondary"
              onClick={() => this.props.onIncrement(this.props.counter)}
            >
              <i className="fa fa-plus-circle" aria-hidden="true" />
            </button>
            <button
              datatestid="btn-decrement"
              className="btn btn-info m-2"
              onClick={() => this.props.onDecrement(this.props.counter)}
              disabled={this.props.counter.value === 0 ? 'disabled' : ''}
            >
              <i className="fa fa-minus-circle" aria-hidden="true" />
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.props.onDelete(this.props.counter.id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  getBadgeClasses = () => {
    let classes = 'badge m-2 badge-'
    classes += this.props.counter.value === 0 ? 'warning' : 'primary'
    return classes
  }

  formatCount = () => {
    const { value } = this.props.counter
    return value === 0 ? 'Zero' : value
  }
}

export default Counter
