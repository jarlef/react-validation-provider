import React from 'react';
import PropTypes from 'prop-types';
import ValidationContext from './context';

export const isValid = (WrappedComponent) => {
    
    class IsValid extends React.Component {

        constructor(props) {
            super(props);
            this.isValid = false;
            console.log(props);
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

        setIsValid(isValid) {
            this.isValid = isValid;            
            this.forceUpdate();
        }

        render() {            
            return (<WrappedComponent {...this.props} isValid={this.isValid} />);
        }
    }

    return class IsValidProxy extends React.Component {

        render() {            ;
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