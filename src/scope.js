import React from 'react';
import ReactDOM from 'react-dom';
import scrollToElement from 'scroll-to-element';

let defaultOptions = {
    manual: false,
    scroll: true,
    scrollOffset: 0,
    scrollEffect: "out-back",
    scollDuration: 1500 
};

const scope = (WrappedComponent, options) => {
    
    return class ValidationScope extends React.Component {

        static childContextTypes = {
            validation: React.PropTypes.object
        };

        constructor(props) {            
            super(props);

            this.options = Object.assign({}, defaultOptions, options);
            this.enabled = !this.options.manual;
            this.isValid = true;

            this.components = [];
            this.subscribers = [];
        }

        componentWillMount() {
            this.update();
        }

        registerComponent(componenent) {
            this.components.push(componenent);
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
            subscriber.setIsValid(this.isValid);
        }

        unregisterComponent(subscriber) {
            const index = this.subscribers.indexOf(subscriber);
            if(index > -1) {
                this.subscribers.splice(index, 1);
            }
        }

        update() {        
            const isValid = this.components.every(c => !!c.valid);
            this.isValid = isValid;
            this.subscribers.forEach(s => s.setIsValid(isValid));              
        }

        getChildContext() {
            const validationContext = {
                registerComponent: (component) => this.registerComponent(component), 
                unregisterComponent: (component) => this.unregisterComponent(component), 
                registerSubscriber: (subscriber) => this.registerSubscriber(subscriber), 
                unregisterSubscriber: (subscriber) => this.unregisterSubscriber(subscriber),
                update: () => this.update(),
                validate: (onSuccess, onFailed) => {
                    this.validate(onSuccess, onFailed);
                },
                isEnabled: () => this.enabled
            };
            
            return {
                validation: validationContext
            };
        }

        validate(onSuccess, onFailed) {
            this.enabled = true;
            this.components.forEach(c => c.checkValid());
        
            if(this.isValid && onSuccess) {
                onSuccess();
            } 

            if(this.isValid && onFailed) {
                onFailed();
            }
            
            if(!this.isValid && this.options.scroll) {
                const component = this.components.filter(c => !!c.valid)[0];
                const element = ReactDOM.findDOMNode(component);

                scrollToElement(element, {
                    offset: this.options.scrollOffset,
                    ease: this.options.scrollEffect,
                    duration: this.options.scrollDuration
                });
            }  
        } 

        render() {

            return (
                <WrappedComponent {...this.props} />
            );
        }
    }
}


export const setDefaultScopeOptions = (options) => {    
    defaultOptions = Object.assign({}, defaultOptions, options);
}


export default (options = {}) => {
    return (WrappedComponent) => scope(WrappedComponent, options);
}