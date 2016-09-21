import React from 'react';
import Layout from './layout';
import _isEqual from 'lodash/isequal';

const isFunction = (x) => {
 return typeof x  === "function"
}

let defaultOptions = {
    custom: false,
    propertyName: "value",
    layout: Layout
};

const evaluate = (WrappedComponent, options) => {    

    return class ValidationComponent extends React.Component {        
        static propTypes = {
            rules: React.PropTypes.array
        };

        static contextTypes = {
            validation: React.PropTypes.object
        };

        constructor(props) {
            super(props);           

            this.options = Object.assign({}, defaultOptions, options);

            this.valid = true;  
            this.pending = false;
            this.errorRule = null;
            this.errorMessage = null;              
        }

        componentWillReceiveProps(nextProps) {          
            if(this.props[this.options.propertyName] !== nextProps[this.options.propertyName] && (!this.context.validation || this.context.validation.isEnabled())) {
                this.validate(nextProps[this.options.propertyName]);
            } 
        }

        componentDidMount() {            
            if(this.context.validation) {    
                this.context.validation.registerComponent(this);
            }
            
            if(!this.context.validation || this.context.validation.isEnabled())
            {
                this.validate(this.props[this.options.propertyName]);
            }
        }

        componentWillUnmount() {
            if(this.context.validation) {            
                this.context.validation.unregisterComponent(this);
            }
        }

        checkValid() {
            this.validate(this.props[this.options.propertyName]);
        }

        validate(value) {           

            let valid = true;
            let pending = false;
            let errorMessage = null;
            let rule = null;

            const updateState = (valid, pending, rule) => {           
                const errorMessage = !valid && !pending ? rule.hint(value) : null;

                const update = this.valid !== valid || this.pending !== pending || this.errorMessage !== errorMessage;

                this.valid = valid;
                this.pending = pending;
                
                if(errorMessage) {
                    this.errorMessage = errorMessage;
                    this.errorRule = rule;
                } else {
                    this.errorMessage = null;
                    this.errorRule = null;
                }

                if(this.context.validation) {
                    this.context.validation.update();
                } 

                if(update) {
                    this.forceUpdate();
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
            
            updateState(valid, pending, !valid ? rule : null); 
        }
    
        render() {

            const { rules, ...componentProps } = this.props;
            const validation = { rules, valid: this.valid, pending: this.pending, errorMessage: this.errorMessage };
            
            if(this.options.custom) {
                return (
                    <WrappedComponent componentProps={componentProps} validation={validation} />
                )
            }

            const Layout = this.options.layout;        
                
            return (
                <Layout {...validation}>
                    <WrappedComponent {...componentProps} />
                </Layout>

            );
            

        }
    }
};

export const setDefaultValidateOptions = (options) => {
    defaultOptions = Object.assign({}, defaultOptions, options);
}

export default (options = {}) => {
    return (WrappedComponent) => evaluate(WrappedComponent, options);
}