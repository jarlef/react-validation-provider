import React from 'react';
import PropTypes from 'prop-types';
import ValidationContext from './context';

export const wrapper = WrappedComponent => {
  class IsValidComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valid: false
      };
    }

    componentDidMount() {
      const { context } = this.props;

      if (!context) {
        return;
      }

      context.registerSubscriber(this);
    }

    componentWillUnmount() {
      const { context } = this.props;

      if (!context) {
        return;
      }

      context.unregisterSubscriber(this);
    }

    setValid(valid) {
      this.setState({
        valid
      });
    }

    render() {
      const { valid } = this.state;
      return <WrappedComponent {...this.props} isValid={valid} />;
    }
  }

  IsValidComponent.propTypes = {
    context: PropTypes.object.isRequired
  };

  return props => {
    return (
      <ValidationContext.Consumer>
        {context => <IsValidComponent {...props} context={context} />}
      </ValidationContext.Consumer>
    );
  };
};

const isValid = () => {
  return WrappedComponent => wrapper(WrappedComponent);
};

export default isValid;
