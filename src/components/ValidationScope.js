import React from 'react';

const defaultProps = {
    manual: false
};

export default function validationScope(Component, options = {}) {

    options = Object.assign({}, defaultProps, options);

    class ValidationScope extends React.Component {

        constructor(props) {
            super(props);

            this.enabled = true;
            this.state = { isValid: true };
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
            this.setState({isValid});            
        }

        getChildContext() {
            const validationContext = {
                register: (component) => this.register(component), 
                unregister: (component) => this.unregister(component),
                update: () => this.update(),
                enabled: this.enabled
            };
            
            return {
                validation: validationContext
            };
        }

        render(){
            const validation = {
                valid: this.state.isValid,
                validate: (onSuccess) => {
                    this.components.forEach(c => c.checkValid());
                    this.update();

                    if(this.state.isValid && onSuccess) {
                        onSuccess();
                    } 
                    
                    if(!this.state.isValid) {
                        //scroll to component here
                        console.log("scroll to element");
                    }

                }
            }
            return (
                <Component {...this.props} validation={validation} />
            );
        }
    }

    ValidationScope.childContextTypes = {
        validation: React.PropTypes.object
    };

    return ValidationScope;
}