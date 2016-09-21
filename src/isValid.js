import React from 'react';

export const isValid = (WrappedComponent) => {
    
    return class IsValidComponent extends React.Component {
        
        static contextTypes = {
            validation: React.PropTypes.object
        };

        constructor(props) {
            super(props);
            this.isValid = false;
        }

        componentDidMount() {            
            if(this.context.validation) {    
                this.context.validation.registerSubscriber(this);
            }
        }

        componentWillUnmount() {
            if(this.context.validation) {            
                this.context.validation.unregisterSubscriber(this);
            }
        }

        setIsValid(isValid) {
            this.isValid = isValid;
            this.forceUpdate();
        }

        render() {            
            return (<WrappedComponent {...this.props} isValid={this.isValid} />);
        }
    }
};

export default () => {
    return (WrappedComponent) => isValid(WrappedComponent);
}