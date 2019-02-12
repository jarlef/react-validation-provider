import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { mount } from 'enzyme';

import scope from './scope';
import isValid from './isValid';
import validate from './validate';

const required = (message = 'Required') => {
  return {
    validate: value => {
      return value != null && !!value.trim();
    },
    hint: () => {
      return message;
    }
  };
};

@validate()
class SomeInput extends React.Component {
  render() {
    return <input {...this.props} />;
  }
}

@scope()
@isValid()
class SomeForm extends React.Component {
  static propTypes = {
    children: PropTypes.any
  };

  static defaultProps = {
    children: null
  };

  render() {
    const { children } = this.props;
    return <div className="form">{children}</div>;
  }
}

@scope()
class SomeStateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    const { value } = this.state;
    return (
      <div className="form">
        <SomeInput
          value={value}
          onChange={e => this.setState({ value: e.target.value })}
          rules={[required]}
        />
      </div>
    );
  }
}

const scopeName = 'ValidationScope';

describe('scope', () => {
  describe('when scope is empty', () => {
    const wrapper = mount(<SomeForm />);
    const validationScope = wrapper.find(scopeName).instance();
    it('empty scope should be valid', () => {
      expect(validationScope.valid).to.be.true;
    });
  });

  describe('when scope contains components without rules', () => {
    const wrapper = mount(
      <SomeForm>
        <SomeInput />
      </SomeForm>
    );

    const validationScope = wrapper.find(scopeName).instance();
    it('should result in valid scope', () => {
      expect(validationScope.valid).to.be.true;
    });
  });

  describe('when scope contains a component that is valid', () => {
    const wrapper = mount(
      <SomeForm>
        <SomeInput value="foo" onChange={f => f} rules={[required]} />
      </SomeForm>
    );
    const validationScope = wrapper.find(scopeName).instance();

    it('should result in valid scope', () => {
      expect(validationScope.valid).to.be.true;
    });
  });

  describe('when scope contains a component that is invalid', () => {
    const wrapper = mount(
      <SomeForm>
        <SomeInput value="" onChange={f => f} rules={[required]} />
      </SomeForm>
    );
    const validationScope = wrapper.find(scopeName).instance();

    it('should result in invalid scope', () => {
      expect(validationScope.valid).to.be.false;
    });
  });

  describe('when all components changes to valid', () => {
    const wrapper = mount(<SomeStateForm />);
    const validationScope = wrapper.find(scopeName).instance();
    const form = wrapper.find('SomeStateForm');

    const originalValidationState = validationScope.valid;
    form.setState({
      value: 'Some value'
    });

    it('should change scope to valid', () => {
      expect(originalValidationState).to.be.false;
      expect(validationScope.valid).to.be.true;
    });
  });

  describe('when all components changes to valid', () => {
    const wrapper = mount(<SomeStateForm />);
    const validationScope = wrapper.find(scopeName).instance();
    const form = wrapper.find('SomeStateForm');

    const originalValidationState = validationScope.valid;
    form.setState({ value: 'Some value' });

    it('should change scope to valid', () => {
      expect(originalValidationState).to.be.false;
      expect(validationScope.valid).to.be.true;
    });
  });
});
