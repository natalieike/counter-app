import React, { Component } from 'react'
import NavBar from './components/navbar'
import Counters from './components/counters'
import InputForm from './components/inputForm'
import Checkout from './components/checkout'

class App extends Component {
  state = {
    counters: [],
    checkout: false, // if true, display checkout (receipt) page
  }

  // retrieve counters state from localStorage
  componentDidMount() {
    try {
      const localCounters = localStorage.getItem('counters')

      let newCounters = []
      if (localCounters) newCounters = JSON.parse(localCounters)

      this.setState({ counters: newCounters })
    } catch (error) {
      console.log('error retrieving saved state, using empty counter')
      console.log(error)
    }
  }

  // saves to component state and to localStorage
  saveCounterState = (counters) => {
    this.setState({ counters }, () => {
      localStorage.setItem('counters', JSON.stringify(counters))
    })
  }

  handleIncrement = (counter) => {
    const counters = [...this.state.counters]
    const index = counters.indexOf(counter)
    counters[index] = { ...counters[index] }
    counters[index].value++

    this.saveCounterState(counters)
  }

  handleDecrement = (counter) => {
    const counters = [...this.state.counters]
    const index = counters.indexOf(counter)
    counters[index] = { ...counters[index] }
    counters[index].value--

    this.saveCounterState(counters)
  }

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0
      return c
    })

    this.saveCounterState(counters)
  }

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId)

    this.saveCounterState(counters)
  }

  handleRestart = () => {
    window.location.reload()
  }

  handleAdd = (counter) => {
    counter.id = this.state.counters.length
    counter.value = 1

    const counters = [...this.state.counters, counter]

    this.saveCounterState(counters)
  }

  // checkoutState = true for checkout page (reciept) or false for Counters
  // also re-sets the cart when moving from the checkout page back to the input page
  handleCheckout = (checkoutState) => {
    const newState = { checkout: checkoutState }

    if (this.state.checkout === true && checkoutState === false) {
      newState.counters = []
    }

    this.setState(newState, () => {
      if (newState.counters) {
        localStorage.setItem('counters', newState.counters)
      }
    })
  }

  render() {
    return (
      <div>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        {!this.state.checkout ? (
          <main className="container">
            <InputForm handleAdd={this.handleAdd} />
            <Counters
              counters={this.state.counters}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
              onRestart={this.handleRestart}
              onSetCheckout={this.handleCheckout}
            />
          </main>
        ) : (
          <main className="container">
            <Checkout
              counters={this.state.counters}
              onSetCheckout={this.handleCheckout}
            />
          </main>
        )}
      </div>
    )
  }
}

export default App
