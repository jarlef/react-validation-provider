import React from 'react';
import PropTypes from 'prop-types';

export default class Layout extends React.PureComponent {
  static propTypes = {
    valid: PropTypes.bool.isRequired,
    children: PropTypes.any,
    errorMessage: PropTypes.string
  };

  static defaultProps = {
    errorMessage: null,
    children: null
  };

  renderError() {
    const { errorMessage } = this.props;
    return <div className="form-element-error">{errorMessage}</div>;
  }

  render() {
    const { valid, children } = this.props;
    const error = !valid ? this.renderError() : null;

    return (
      <div>
        {children}
        {error}
      </div>
    );
  }
}
