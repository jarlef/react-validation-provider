import React from 'react';
import PropTypes from 'prop-types';
import ValidationContext from './context';

import { isFunction, compareArrays } from './utils';
import Layout from './internal/layout';

let defaultOptions = {
  custom: false,
  propertyName: 'value',
  layout: Layout
};

const wrapper = (WrappedComponent, specifiedOptions) => {
  const options = Object.assign({}, defaultOptions, specifiedOptions);

  const validate = props => {
    const value = props[options.propertyName];

    const pending = false;
    let valid = true;
    let rule = null;
    let actualRule = null;

    if (props.rules) {
      for (let i = 0; i < props.rules.length; i += 1) {
        rule = props.rules[i];

        if (isFunction(rule)) {
          actualRule = rule();
        } else {
          actualRule = rule;
        }

        if (
          (value === undefined || value === null) &&
          !actualRule.handlesNull
        ) {
          break;
        }

        const result = !!actualRule.validate(value);
        valid = !!result;

        if (!valid) {
          break;
        }
      }
    }

    const hint = !valid && !pending ? actualRule.hint : null;
    let errorMessage = null;
    if (hint) {
      if (isFunction(hint)) {
        errorMessage = hint(value);
      } else {
        errorMessage = hint;
      }
    }

    return {
      valid,
      rules: props.rules || [],
      pending,
      errorMessage,
      errorRule: errorMessage ? rule : null
    };
  };

  class ValidationComponent extends React.Component {
    static propTypes = {
      context: PropTypes.object.isRequired,
      rules: PropTypes.array
    };

    static defaultProps = {
      rules: []
    };

    constructor(props) {
      super(props);

      this.valid = true;

      const state = {
        valid: this.valid,
        pending: false,
        errorRule: null,
        errorMessage: null,
        rules: props.rules || [],
        value: props[options.propertyName]
      };

      if (props.rules && props.rules.length > 0) {
        this.state = {
          ...state,
          ...validate(props)
        };
        const { valid } = this.state;
        this.valid = valid;
      }
    }

    static getDerivedStateFromProps(props, state) {
      if (
        !props.context ||
        !props.context.isEnabled ||
        !props.context.isEnabled()
      ) {
        return null;
      }

      const value = props[options.propertyName];

      if (!props.rules || props.rules.length === 0) {
        return {
          valid: true,
          pending: false,
          errorRule: null,
          errorMessage: null,
          rules: props.rules || [],
          value
        };
      }
      const rulesHaveChanged = !compareArrays(state.rules, props.rules);
      const valueHasChanged = value !== state.value;

      // no state change
      if (!rulesHaveChanged && !valueHasChanged) {
        return null;
      }
      return validate(props);
    }

    componentDidMount() {
      const { context } = this.props;

      if (context) {
        context.registerComponent(this);
      }
    }

    componentDidUpdate() {
      const { valid } = this.state;
      if (this.valid === valid) {
        return;
      }

      this.valid = valid;

      const { context } = this.props;
      if (context) {
        context.update();
      }
    }

    componentWillUnmount() {
      const { context } = this.props;

      if (context) {
        context.unregisterComponent(this);
      }
    }

    checkValid() {
      const stateChange = validate(this.props);
      this.valid = stateChange.valid;
      if (stateChange) {
        this.setState(stateChange);
      }
    }

    render() {
      const { rules, ...componentProps } = this.props;
      const { valid, pending, errorMessage } = this.state;
      const validation = {
        rules,
        valid,
        pending,
        errorMessage
      };

      if (options.custom) {
        return (
          <WrappedComponent
            componentProps={componentProps}
            validation={validation}
          />
        );
      }

      const LayoutWrapper = options.layout;

      return (
        <LayoutWrapper {...validation}>
          <WrappedComponent {...componentProps} />
        </LayoutWrapper>
      );
    }
  }

  return props => {
    return (
      <ValidationContext.Consumer>
        {context => <ValidationComponent {...props} context={context} />}
      </ValidationContext.Consumer>
    );
  };
};

export const setDefaultValidateOptions = options => {
  defaultOptions = Object.assign({}, defaultOptions, options);
};

const validate = (options = {}) => {
  return WrappedComponent => wrapper(WrappedComponent, options);
};

export default validate;
