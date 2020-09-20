import React, { useState } from 'react'
import formatString from 'format-string-by-pattern'

const InputForm = (props) => {
  // state variables for form
  const defaultValues = { name: '', price: '' }
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState({})

  // validators
  const required = (value) => (value ? undefined : 'Required')
  const mustBeNumber = (value) =>
    isNaN(value) ? 'Must be a number' : undefined
  const validation = {
    name: [required],
    price: [required, mustBeNumber],
  }

  // field: string, value: string
  const validate = (field, value) => {
    return validation[field].reduce((err, validator) => {
      return err || validator(value)
    }, undefined)
  }

  // field: string, value: string
  const onChangeValue = (field, value) => {
    const error = validate(field, value)

    if (error !== errors[field]) setErrors({ ...errors, [field]: error })
    setValues({ ...values, [field]: value })
  }

  // resets the form values
  const resetValues = () => {
    setValues(defaultValues)
    setErrors({})
  }

  // validates all fields and if there are no errors, adds a counter row
  const onSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const nameError = validate('name', values.name)
    const priceError = validate('price', values.price)

    if (nameError || priceError) {
      setErrors({ name: nameError, price: priceError })
      return
    }

    props.handleAdd(values)
    resetValues()
  }

  // Formats price in 'xx.xx' format - will return a string
  // formatString concatenates the string to the exact format
  // so to account for longer numbers we build the format string dynamically
  const formatCurrency = (numString) => {
    if (!numString || numString.length < 3) return '0.00'

    const dollarsWidth = numString.length - 3
    return `${'0'.repeat(dollarsWidth)}.00`
  }

  return (
    <form className="form-row mt-3">
      <div className="col-md-4 mb-3">
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          placeholder="Item Name"
          value={values.name}
          onChange={(event) => {
            onChangeValue('name', event.target.value)
          }}
        />
        <div className="invalid-feedback">{errors.name}</div>
      </div>

      <div className="col-md-4 mb-3">
        <label className="sr-only" htmlFor="price">
          Price
        </label>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input
            type="text"
            className={`form-control  text-right ${
              errors.price ? 'is-invalid' : ''
            }`}
            id="price"
            placeholder="0.00"
            value={values.price}
            onChange={(event) => {
              onChangeValue(
                'price',
                formatString(formatCurrency(event.target.value))(
                  event.target.value
                )
              )
            }}
          />
          <div className="invalid-feedback">{errors.price}</div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <button className="btn btn-primary mb-2 mr-sm-2" onClick={onSubmit}>
          Submit
        </button>

        <button
          className="btn btn-secondary mb-2"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            resetValues()
          }}
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default InputForm
