import React from 'react';
import ValidationContext from './context';

export const isValid = (WrappedComponent) => {
    
    class IsValid extends React.Component {

        constructor(props) {
            super(props);
            this.isValid = false;
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

        setValid(isValid) {
            const changed = isValid !== this.isValid;
            this.isValid = isValid;     
            if(changed) {
                this.forceUpdate();
            }
        }

        render() {            
            return (<WrappedComponent {...this.props} isValid={this.isValid} />);
        }
    }

    return class IsValidProxy extends React.Component {

        render() {           
            return (<ValidationContext.Consumer>
                        {context => <IsValid {...this.props} context={context} />}
                    </ValidationContext.Consumer>
            );
        }
    }
};


export default () => {
    return (WrappedComponent) => isValid(WrappedComponent);
}