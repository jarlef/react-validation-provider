import React from 'react';
import Layout from './layout';
import PropTypes from 'prop-types';

const isFunction = (x) => {
    return typeof x  === "function";
}

const isObject = (x) => {
    return typeof x  === "object";
}

const compareItems = (item1, item2) => {
    if(isFunction(item1)) {
            return item1 === item2;
    }

    if(isObject(item1)) {
        return JSON.stringify(item1) === JSON.stringify(item2);
    }

    return item1 === item2;
} 

const compareArrays = (array1, array2) => {
    array1 = [].concat(array1);
    array2 = [].concat(array2);

    return array1.length === array2.length && array1.every((item1, index) => {
        const item2 = array2[index];
        return compareItems(item1, item2);
    });
}

let defaultOptions = {
    custom: false,
    propertyName: "value",
    layout: Layout
};

const evaluate = (WrappedComponent, options) => {    

    return class ValidationComponent extends React.Component {        
        static propTypes = {
            rules: PropTypes.array
        };

        static contextTypes = {
            validation: PropTypes.object
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

            let rulesHaveChanged = false;
            if(!this.valid) {
                if(!nextProps.rules || nextProps.rules.length === 0 || nextProps.rules.every(r => !compareItems(r, this.errorRule))) {
                    this.valid = true;  
                    this.pending = false;
                    this.errorRule = null;
                    this.errorMessage = null; 
                    this.forceUpdate(); 
                    return;
                } 
            } else {
                rulesHaveChanged = !compareArrays(this.props.rules, nextProps.rules);
            }

            if((rulesHaveChanged || this.props[this.options.propertyName] !== nextProps[this.options.propertyName]) && (!this.context.validation || this.context.validation.isEnabled())) {
               this.validate(nextProps[this.options.propertyName], nextProps);
            }
            
        }

        componentDidMount() {            
            if(this.context.validation) {    
                this.context.validation.registerComponent(this);
            }
            
            if(!this.context.validation || this.context.validation.isEnabled())
            {
                this.validate(this.props[this.options.propertyName], this.props);
            }
        }

        componentWillUnmount() {
            if(this.context.validation) {            
                this.context.validation.unregisterComponent(this);
            }
        }

        checkValid() {
            this.validate(this.props[this.options.propertyName], this.props);
        }

        validate(value, props) {           

            let valid = true;
            let pending = false;
            let errorMessage = null;
            let rule = null;
            let actualRule = null;

            const updateState = (valid, pending, rule, actualRule) => {           
                const errorMessage = !valid && !pending ? actualRule.hint(value) : null;

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

            if(props.rules) {
                for (var i = 0; i < props.rules.length; i++) {
                    rule = props.rules[i];
                    
                    if(isFunction(rule)) {
                        actualRule = rule();
                    } else {
                        actualRule = rule;
                    }
                    
                    const result = !!actualRule.validate(value);                   
                    valid = !!result;                
                    
                    if(!valid) {
                        break;
                    }
                }
            }
            
            updateState(valid, pending, !valid ? rule : null, !valid ? actualRule : null); 
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
    };
};

export const setDefaultValidateOptions = (options) => {
    defaultOptions = Object.assign({}, defaultOptions, options);
}

export default (options = {}) => {
    return (WrappedComponent) => evaluate(WrappedComponent, options);
}