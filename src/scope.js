import React from 'react';
import ReactDOM from 'react-dom';
import scrollToElement from 'scroll-to-element';

const defaultOptions = {
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

            this.enabled = !options.manual;
            this.isValid = true;

            this.state = { isValid: this.isValid };
            this.components = [];
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
                isEnabled: () => this.enabled
            };
            
            return {
                validation: validationContext
            };
        }

        render(){
            const validation = {
                valid: this.state.isValid,
                validate: (onSuccess, onFailed) => {
                    this.enabled = true;
                    this.components.forEach(c => c.checkValid());
                
                    if(this.isValid && onSuccess) {
                        onSuccess();
                    } 

                    if(this.isValid && onFailed) {
                        onFailed();
                    }
                    
                    if(!this.isValid && options.scroll) {
                        const component = this.components[0];
                        const element = ReactDOM.findDOMNode(component);

                        scrollToElement(element, {
                            offset: options.scrollOffset,
                            ease: options.scrollEffect,
                            duration: options.scrollDuration
                        });

                    }

                }
            }
            return (
                <WrappedComponent {...this.props} validation={validation} />
            );
        }
    }
}

export default (options = {}) => {
    const mergedOptions = Object.assign({}, defaultOptions, options);

    return (WrappedComponent) => scope(WrappedComponent, mergedOptions);
}