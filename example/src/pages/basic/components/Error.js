import React from 'react';

export default class Error extends React.PureComponent {
    render() {

        if(this.props.validation.valid) {
            return <div />;
        }

        return  ( 
            <div className="form-element-error">
                * {this.props.validation.errorMessage}
            </div>
        );
    }
}
