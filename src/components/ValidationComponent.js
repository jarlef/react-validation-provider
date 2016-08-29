import React from 'react';

const suppress = () => {};

const isFunction = (x) => {
 return typeof x  === "function"
}

export default function validationComponent(Component) {
    class ValidationComponent extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                valid: true,
                errorMessage: null
            };

            this.valid = true;    
        }

        componentWillReceiveProps(nextProps) {
            if(this.props.value !== nextProps.value) {
                this.validate(nextProps.value);
            }
        }

        componentDidMount() {            
            if(this.context.validation) {    
                this.context.validation.register(this);
            }
            
            this.validate(this.props.value);
        }

        componentWillUnmount() {
            if(this.context.validation) {            
                this.context.validation.unregister(this);
            }
        }

        validate(value) {
            let valid = true;
            let errorMessage = null;

            for (var i = 0; this.props.rules && i < this.props.rules.length; i++) {
                let rule = this.props.rules[i];
                
                if(isFunction(rule))
                {
                    rule = rule();
                }
                
                valid = !!rule.validate(value);

                if(!valid) {
                    errorMessage = rule.hint(value);
                    break;
                }
            }

            this.setState({ valid, errorMessage });
            this.valid = valid;
            this.errorMessage = errorMessage;

            if(this.context.validation) {
                this.context.validation.update();
            }
        }
      
        render() {

            let error = null
            
            if(!this.state.valid) {
                error = (
                    <span className="form-element-error">
                        * {this.state.errorMessage}
                    </span>
                );
            };

            const { rules, ...componentProps } = this.props;
            suppress(rules); //prevent linter warning
            return (
                <span>
                    <Component {...componentProps} />
                    {error}                 
                </span>
            )
        }
    }

    ValidationComponent.propTypes = {
        value: React.PropTypes.any.isRequired,
        rules: React.PropTypes.array
    }

    ValidationComponent.contextTypes = {
        validation: React.PropTypes.object
    }

    return ValidationComponent;
}