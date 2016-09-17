import React from 'react';

import hoistStatics from 'hoist-non-react-statics';

const isFunction = (x) => {
 return typeof x  === "function"
}

const defaultOptions = {
    custom: false
};

export const evaluate = (WrappedComponent, options) => {

    
    class ValidationComponent extends React.Component {

        static propTypes = {
            value: React.PropTypes.any.isRequired,
            rules: React.PropTypes.array
        };

        static contextTypes = {
            validation: React.PropTypes.object
        };

        constructor(props) {
            super(props);           

            this.state = {
                valid: true,
                pending: false,
                errorMessage: null
            };

            this.valid = true;  
            this.pending = false;
            this.errorMessage = null;              
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
            let pending = false;
            let errorMessage = null;
            let rule = null;

            const updateState = (valid, pending, rule) => {           
                const errorMessage = !valid && !pending ? rule.hint(value) : null;

                this.setState({ valid, pending, errorMessage });
                this.valid = valid;
                this.pending = pending;
                this.errorMessage = errorMessage;
                
                if(this.context.validation) {
                    this.context.validation.update();
                } 
            };

            if(this.props.rules) {
                for (var i = 0; i < this.props.rules.length; i++) {
                    rule = this.props.rules[i];
                    
                    if(isFunction(rule))
                    {
                        rule = rule();
                    }
                    
                    const result = !!rule.validate(value);

                    if(result instanceof Promise) {
                        pending = true;
                        valid = false;
                        result.then((result) => {                             
                            updateState(!!result, false, rule);                           
                        }).catch(() => {                                          
                            updateState(false, false, rule); 
                        });
                    }
                    else {
                        valid = !!result;
                    }
                    
                    if(!valid) {
                        break;
                    }
                }
            }
            
            updateState(valid, pending, rule); 
        }
    
        render() {

            const { rules, ...componentProps } = this.props;
            const validation = { rules, valid: this.state.valid, pending: this.state.pending, errorMessage: this.state.errorMessage };
            
            if(options.custom) {
                return (
                    <WrappedComponent componentProps={componentProps} validation={validation} />
                )
            }

            const error = !this.state.valid ? ( <div className="form-element-error">
                                                    {this.state.errorMessage}
                                                </div>
                                            ) : <div />;
        
                
            return (
                <div>
                    <WrappedComponent {...componentProps} />
                    {error}
                </div>

            );
            

        }
    }

    
    return ValidationComponent;
};

export default (options = {}) => {

    const margedOptions = Object.assign({}, defaultOptions, options);

    return (WrappedComponent) => evaluate(WrappedComponent, margedOptions);
}