import React from 'react';

const isFunction = (x) => {
 return typeof x  === "function"
}

export default function validate(Component) {
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
            if(this.props.value !== nextProps.value && (!this.context.validation || this.context.validation.isEnabled())) {
                this.validate(nextProps.value);
            }
        }

        componentDidMount() {            
            if(this.context.validation) {    
                this.context.validation.register(this);
            }
            
            if(!this.context.validation || this.context.validation.isEnabled())
            {
                this.validate(this.props.value);
            }
        }

        componentWillUnmount() {
            if(this.context.validation) {            
                this.context.validation.unregister(this);
            }
        }

        checkValid() {
            this.validate(this.props.value);
        }

        validate(value) {           

            let valid = true;
            let errorMessage = null;

            if(this.props.rules) {
                for (var i = 0; i < this.props.rules.length; i++) {
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
            }

            this.setState({ valid, errorMessage });
            this.valid = valid;
            this.errorMessage = errorMessage;

            if(this.context.validation) {
                this.context.validation.update();
            }
        }
      
        render() {

            const { rules, ...componentProps } = this.props;
            const validation = { rules, valid: this.state.valid, errorMessage: this.state.errorMessage };
            
            return (
                <Component props={componentProps} validation={validation} />
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