import React from 'react';
import PropTypes from 'prop-types';
import ValidationContext from './context';

export const trigger = (WrappedComponent) => {
    
    
    class TriggerComponent extends React.Component {

        validate(onSuccess, onFailed) {
            const { context } = this.props;
            if(context) {
                context.validate(onSuccess, onFailed);
            }
            else {
                onSuccess();
            }
        }

        render() {
            return (<WrappedComponent {...this.props} validate={(onSuccess, onFailed) => this.validate(onSuccess, onFailed)} />);
        }
    }

    return (props) => {
        return (
            <ValidationContext.Consumer>
            {context => <TriggerComponent {...props} context={context} />}
            </ValidationContext.Consumer>

        )
    }
};

export default () => {
    return (WrappedComponent) => trigger(WrappedComponent)
}