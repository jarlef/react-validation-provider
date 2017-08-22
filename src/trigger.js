import React from 'react';
import PropTypes from 'prop-types';

export const trigger = (WrappedComponent) => {
    
    return class TriggerComponent extends React.Component {
        
        static contextTypes = {
            validation: PropTypes.object
        };

        validate(onSuccess, onFailed) {
            if(this.context.validation) {
                this.context.validation.validate(onSuccess, onFailed);
            }
            else {
                onSuccess();
            }
        }

        render() {
            return (<WrappedComponent {...this.props} validate={(onSuccess, onFailed) => this.validate(onSuccess, onFailed)} />);
        }
    }
};

export default () => {
    return (WrappedComponent) => trigger(WrappedComponent);
}