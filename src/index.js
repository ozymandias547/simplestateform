export default function(options) {

  async function validate() {
    // If something has changed outside of "onInputChange" in the state, we need to revalidate
    // get the current values using "getValue".  afterwards, send them to getFormValues that validates

    let values = {}

    for (let key in schema)
      values[key] = getValue.call(_this, key);

    const validatedValues = await validateValues(schema, values)

    setValues(schema, validatedValues)

    return validatedValues

  }

  async function onInputChange (e) {
    const { key, value } = getKeyValueFromInput(e)
    const valueObject = await calculateStateValue(key, value, schema)
    setValue(key, valueObject)
    afterInputChange(key, valueObject)
  }

  function validateSubmission (cb) {
    return async (e) => {

      e.preventDefault()

      const validatedValues = await validate()

      let values = {}
      let errors = []

      for (let key in validatedValues) {
        values[key] = validatedValues[key].value
        if (validatedValues[key].error)
          errors.push(validatedValues[key].error)
      }

      return cb(e, values, errors, validatedValues)

    }
  }

  function setValues(schema, values) {
    let newState = {..._this.state};

    for (let key in schema) {
      newState = addValueToState(newState, key, values[key])
    }

    _this.setState(newState)
  }

  function addValueToState(oldState, key, valueObject) {
    return {
      ...oldState,
      values: {
        ...oldState.values,
        [key]: {...valueObject}
      }
    }
  }

  function _setValue(key, valueObject) {
    const newState = addValueToState(_this.state, key, valueObject)
    _this.setState(newState)
  }

  function _getValue(key) {
    return _this.state.values[key]
  }

  function getKeyValueFromInput(e) {
    const key = e.currentTarget.getAttribute('name')
    const value = e.currentTarget.type === 'checkbox'
      ? e.currentTarget.checked
      : e.currentTarget.value
    return { key, value }
  }

  async function calculateStateValue (key, value, schema = {}) {
    const validator = await schema[key]?.validate
    const error = typeof validator === 'function' ? await validator.call(_this, value) : null
    return {
      value,
      error,
    }
  }

  /*
  Gets form values without an async call and without validation
   */
  function getFormValuesNoValidation (schema, values) {
    let result = {}

    for (var name in schema) {
      if (schema.hasOwnProperty(name)) {
        let fieldSchema = schema[name]

        // If not initial value
        if (values && values[name]) {
          result[name] = {value: values[name].value, error: null}
        }
        // If initial value
        else {
          const initialValue =
            typeof fieldSchema.initial === 'function' ? fieldSchema.initial() : fieldSchema.initial

          result[name] = {value: initialValue || "", error: null}
        }
      }
    }

    return result
  }

  /*
  Gets form values without an async call and ***with validation
   */
  async function validateValues (schema, values) {
    let result = {}

    for (var name in schema) {
      if (schema.hasOwnProperty(name)) {
        let fieldSchema = schema[name]

        // If not initial value
        if (values && values[name]) {
          result[name] = await calculateStateValue(name, values[name].value, schema)
        }
        // If initial value
        else {
          const initialValue =
            typeof fieldSchema.initial === 'function' ? fieldSchema.initial() : fieldSchema.initial

          result[name] = await calculateStateValue(name, initialValue, schema)
        }
      }
    }

    return result
  }

  let settings = Object.assign({
    setValue: _setValue,
    getValue: _getValue,
    schema: {},
    component: {state: {}},
    afterInputChange: () => {}
  }, options)

  var _this = settings.component
  let schema = settings.schema
  let setValue = settings.setValue
  let getValue = settings.getValue
  let afterInputChange = settings.afterInputChange
  let initialValues = getFormValuesNoValidation(schema)

  return {
    initialValues,
    schema,
    onInputChange,
    validate,
    validateSubmission
  }
}

