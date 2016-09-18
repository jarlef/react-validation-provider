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

            this.state = { isValid: this.isValid };
            this.components = [];
            this.triggers = [];
        }

        componentWillMount() {
            this.update();
        }

        register(componenent) {
            this.components.push(componenent);
            this.update();
        }

        unregister(component) {
            const index = this.components.indexOf(component);
            if(index > -1) {
                this.components.splice(index, 1);
                this.update();
            }
        }

        update() {        
            const isValid = this.components.every(c => !!c.valid);
            this.isValid = isValid;
            this.setState({isValid});  
              
        }

        getChildContext() {
            const validationContext = {
                register: (component) => this.register(component), 
                unregister: (component) => this.unregister(component),
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
                const component = this.components[0];
                const element = ReactDOM.findDOMNode(component);

                scrollToElement(element, {
                    offset: this.options.scrollOffset,
                    ease: this.options.scrollEffect,
                    duration: this.options.scrollDuration
                });
            }  
        } 

        render(){
            const validation = {
                valid: this.state.isValid,
                validate: (onSuccess, onFailed) => {
                    this.validate(onSuccess, onFailed);
                }
            }
            return (
                <WrappedComponent {...this.props} validation={validation} />
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