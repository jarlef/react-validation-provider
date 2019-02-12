import React from 'react';
import PropTypes from 'prop-types';

export default class Layout extends React.PureComponent {

    static propTypes = {
        valid: PropTypes.bool,
        errorMessage: PropTypes.string
    }
    render() {       
        const error = !this.props.valid ? ( <div className="form-element-error">
                                                {this.props.errorMessage}
                                            </div>
                                        ) : ( <div /> ); 
        return (
            <div>
                {this.props.children}
                {error}
            </div>
        );
    }
}