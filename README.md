# React Validation Provider

Non-intrusive validation library for [React](https://facebook.github.io/react/)

[![npm version](https://badge.fury.io/js/react-validation-provider.svg)](https://www.npmjs.com/package/react-validation-provider) ![downloads](https://img.shields.io/npm/dt/react-validation-provider.svg?style=popout) [![Build Status](https://travis-ci.org/jarlef/react-validation-provider.svg?branch=master)](https://travis-ci.org/jarlef/react-validation-provider) [![Known Vulnerabilities](https://snyk.io/test/github/jarlef/react-validation-provider/badge.svg)](https://snyk.io/test/github/jarlef/react-validation-provider)

## Requirements

| Dependency | Version   |
|------------|-----------|
| React      | >= 16.3.0 |
| Prop-Types | >= 15.6.1 |

## Changelog

[View changelog](./CHANGELOG.MD)

## Installation

```bash
npm install --save react-validation-provider
```

## Example usage

The first you need to define in you application is the form element types
that is going to be validated. This is done by wrapping the input elements/components
inside a react component that is decorated with *@validate* decorator.

```jsx
import { validate } from 'react-validation-provider';

@validate()
export default class TextInput extends React.Component {
  render() {
    return (
      <input type="text" {...this.props} />
    );
  }
}
```

```jsx
//alternative without using decorator
import { validate } from 'react-validation-provider';

class TextInput extends React.Component {
  render() {
    return (
        <input type="text" {...this.props} />
    );
  }
}

export default validate()(TextInput);
```

Afterwards you simply place these components inside your form components

```jsx
    <label>Name</label>
    <TextInput value={this.state.name}
               onChange={(ev) => this.setState({name: ev.target.value})}
               rules={[required]} />
    <label>Year</label>
    <TextInput value={this.state.year}
               onChange={(ev) => this.setState({year: ev.target.value})}
               rules={[required, year]} />
```

The rules prop is a special prop used by the component to validate
the value prop of the wrapped component. The rules are simply implemented by
defining and object with a validation expression and a message hint method.

```javascript
export const required = (message = "Required field") => {
  return {
    handlesNull: true,
    validate: value => {
        return value != null && !!value.trim();
    },
    hint: () => {
        return message;
    }
  };
};

// 1900 - 2099
export const year = (message = "Invalid year") => {
  return {
    validate: value => {
        return /^(19|20)\d{2}$/.test(value);
    },
    hint: () => {
        return message;
    }
  };
};
```

The last thing you have to define the the validation scope. This is typically the top most form component that
contains all the input components that are going to be evaluate. The result of the evaluated validation is
injected into the isValid prop.

```jsx
import React from 'react';
import { scope, isValid } from 'react-validation-provider';
import TextInput from './my-test-input';

@scope() // the validation boundary
@isValid // inject the result (props.isValid)
export default class MyForm extends React.Component {

  state = {
    name: null,
    year: null
  };

  onSubmit() {
    // submit data to api...
  }

  render() {
    return(
      <div>
        <label>Name</label>
        <TextInput
          value={this.state.name}
          onChange={(ev) => this.setState({name: ev.target.value})}
          rules={[required]} />
        <label>Year</label>
        <TextInput
          value={this.state.year}
          onChange={(ev) => this.setState({year: ev.target.value})}
          rules={[required, year]} />

        <button
          disabled={!this.props.isValid}
          onClick={() => this.onSubmit()}>Submit</button>
      </div>
    );
  }
}
```
