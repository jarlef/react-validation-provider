import React from 'react';
import ValidationContext from './context';

let defaultOptions = {
    manual: false
};

const scope = (WrappedComponent, options) => {
    
    return class ValidationScope extends React.Component {

        constructor(props) {            
            super(props);

            this.options = Object.assign({}, defaultOptions, options);
            this.enabled = !this.options.manual;
            this.valid = true;

            this.components = [];
            this.subscribers = [];
        }

        
        componentDidMount() {
            this.update();
        }

        registerComponent(component) {         
            this.components.push(component);
            this.update();
        }

        unregisterComponent(component) {                       
            const index = this.components.indexOf(component);
            if(index > -1) {
                this.components.splice(index, 1);
                this.update();
            }
        }

        registerSubscriber(subscriber) {
            this.subscribers.push(subscriber);
            subscriber.setValid(this.valid);
        }

        unregisterSubscriber(subscriber) {
            const index = this.subscribers.indexOf(subscriber);
            if(index > -1) {
                this.subscribers.splice(index, 1);
            }
        }

        update() { 
            this.valid = this.components.every(c => !!c.valid);
            this.subscribers.forEach(s => s.setValid(this.valid));              
        }

        validate(onSuccess, onFailed) {
            this.enabled = true;
            this.components.forEach(c => c.checkValid());
            this.enabled = !this.options.manual;

            this.update();
        
            if(this.valid && onSuccess) {
                onSuccess();
                return;
            } 

            if(!this.valid && onFailed) {
                onFailed(this.components.filter(c => !c.valid));
            }
        } 

        getContextProps() {
            const validationContext = {
                registerComponent: (component) => this.registerComponent(component), 
                unregisterComponent: (component) => this.unregisterComponent(component), 
                registerSubscriber: (subscriber) => this.registerSubscriber(subscriber), 
                unregisterSubscriber: (subscriber) => this.unregisterSubscriber(subscriber),
                update: () => this.update(),
                validate: (onSuccess, onFailed) => {
                    this.validate(onSuccess, onFailed);
                },
                isEnabled: () => this.enabled,
                isValid: () => this.valid
            };
            
            return validationContext;
        }

       

        render() {

            const contextProps = this.getContextProps();
            return (
                <ValidationContext.Provider value={contextProps}>
                    <WrappedComponent {...this.props} />
                </ValidationContext.Provider>
            );
              
        }
    }
}


export const setDefaultScopeOptions = (options = {}) => {    
    defaultOptions = Object.assign({}, defaultOptions, options);
}


export default (options = {}) => {
    return (WrappedComponent) => scope(WrappedComponent, options);
}