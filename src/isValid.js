import React from 'react';
import ValidationContext from './context';

export const isValid = (WrappedComponent) => {
    
    class IsValidComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = { valid: false };
        }

        componentDidMount() {          
            if(!this.props.context) {  
                return;
            }  

            this.props.context.registerSubscriber(this);            
        }

        componentWillUnmount() {
            if(!this.props.context) {     
                return;
            }      
       
            this.props.context.unregisterSubscriber(this);            
        }

        setValid(valid) {
            this.setState({ valid });
        }

        render() {            
            return (<WrappedComponent {...this.props} isValid={this.state.valid} />);
        }
    }

    return class ContextWrapper extends React.Component {

        render() {           
            return (<ValidationContext.Consumer>
                        {context => <IsValidComponent {...this.props} context={context} />}
                    </ValidationContext.Consumer>
            );
        }
    }
};


export default () => {
    return (WrappedComponent) => isValid(WrappedComponent);
}