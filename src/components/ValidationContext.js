import React from 'react';

export default function validationContext(Component) {

    class ValidationContext extends React.Component {

        constructor(props) {
            super(props);

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
                update: () => this.update()
            };
            
            return {
                validation: validationContext
            };
        }

        render(){
            return (
                <Component {...this.props} isValid={this.state.isValid} />
            );
        }
    }

    ValidationContext.childContextTypes = {
        validation: React.PropTypes.object
    };

    return ValidationContext;
}