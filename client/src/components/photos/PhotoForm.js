// Reusable form for creating and editing photos

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PhotoForm extends Component {
  renderError = ({ error, touched }) => {
    // Destructure the error and touched properties off the formProps meta property

    if (touched && error) {
      // If field was touched and has error, print associated error message property (see validate fx below)
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    // Destructure the built-in redux-form 'input' formProps and hook them up to create controlled components

    // Only highlight input with red if user has touched the input (so it's not red to start)
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // Call passed action on submit (e.g. POST photo or PUT edits to photo)
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      // Using the built-in redux-form handleSubmit and passing it to my onSubmit callback, which gets automatically passed the form's values
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field name='url' component={this.renderInput} label='Enter URL' />
        <Field
          name='tags'
          component={this.renderInput}
          label='Enter tags separated by # (e.g. #cool#fun)'
        />
        <button className='ui primary button'>Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  // Redux-form automatically calls this whenever the form is interacted with
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.url) {
    errors.url = 'You must enter a URL';
  }
  if (!formValues.tag) {
    errors.tag =
      'You must enter at least one tag with the following format (#tag#secondTag)';
  }
  return errors;
};

export default reduxForm({
  form: 'photoForm',
  validate,
})(PhotoForm);
