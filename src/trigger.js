import React from 'react';

const isFunction = (x) => {
 return typeof x  === "function"
}

const defaultOptions = {
    custom: false
};

export const trigger = (WrappedComponent) => {
    
    return class TriggerComponent extends React.Component {
        
        static contextTypes = {
            validation: React.PropTypes.object
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

            const validation = {
                validate: (onSuccess, onFailed) => {
                    this.validate(onSuccess, onFailed);
                }
            }
            return (<WrappedComponent {...this.props} validation={validation} />);
        }
    }
};

export default () => {
    return (WrappedComponent) => trigger(WrappedComponent);
}