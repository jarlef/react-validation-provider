import React from 'react';
import PropTypes from 'prop-types';
import ValidationContext from './context';

const wrapper = WrappedComponent => {
  class TriggerComponent extends React.Component {
    static propTypes = {
      context: PropTypes.object.isRequired
    };

    validate(onSuccess, onFailed) {
      const { context } = this.props;
      if (context) {
        context.validate(onSuccess, onFailed);
      } else {
        onSuccess();
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          validate={(onSuccess, onFailed) => this.validate(onSuccess, onFailed)}
        />
      );
    }
  }

  return props => {
    return (
      <ValidationContext.Consumer>
        {context => <TriggerComponent {...props} context={context} />}
      </ValidationContext.Consumer>
    );
  };
};

const trigger = () => {
  return WrappedComponent => wrapper(WrappedComponent);
};

export default trigger;
