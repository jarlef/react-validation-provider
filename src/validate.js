import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import { isFunction, compareItems, compareArrays } from './utils';
import ValidationContext from './context';

let defaultOptions = {
    custom: false,
    propertyName: "value",
    layout: Layout
};

const evaluate = (WrappedComponent, specifiedOptions) => {    
    
    const options = Object.assign({}, defaultOptions, specifiedOptions);


    const validate = (props, state) => {    

        const value = props[options.propertyName];

        let valid = true;
        let pending = false;
        let errorMessage = null;
        let rule = null;
        let actualRule = null;

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

        
        const updateState = (valid, pending, rule, actualRule) => {           
            const errorMessage = !valid && !pending ? actualRule.hint(value) : null;

            const update = state.valid !== valid || state.pending !== pending || state.errorMessage !== errorMessage;

            const { context } = props;

            return {
                valid,
                pending,
                errorMessage,
                errorRule: errorMessage ? rule : null
            }
        };

       
        return updateState(valid, pending, !valid ? rule : null, !valid ? actualRule : null); 
    }

    class ValidationComponent extends React.Component {        
        static propTypes = {
            rules: PropTypes.array
        };
        constructor(props) {
            super(props);           

            this.valid = false;
        
            this.state = {
                valid: false,
                pending: false,
                errorRule: null,
                errorMessage: null,
                rules: [],
                value: null
            }            
        }
        

        static getDerivedStateFromProps(props, state) {          

            const value = props[options.propertyName];
            let rulesHaveChanged = false;
            if(!state.valid) {
                if(!props.rules || props.rules.length === 0 || props.rules.every(r => !compareItems(r, state.errorRule))) {
                    return {
                        valid: true,
                        pending: false,
                        errorRule: null,
                        errorMessage: null,
                        rules: props.rules || [],
                        value: value
                    }
                } 
            } 
            else {
                rulesHaveChanged = !compareArrays(state.rules, props.rules);
            }
            
            const { context } = props;

            if( (rulesHaveChanged || value !== state.value && (!props.context || props.context.isEnabled()))) {
               return validate(props, state);
            }

            return null;
            
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
        
            if(this.valid !== prevState.valid) {
                this.valid = this.state.valid;
                this.props.context.update();
            }
        }
        componentDidMount() {    
            const { context } = this.props;

            if(context) {    
                context.registerComponent(this);
            }
            
            if(!context || context.isEnabled())
            {
                setTimeout(() => this.checkValid(),0);
            }
        }

        componentWillUnmount() {
            const { context } = this.props;

            if(context) {            
                context.unregisterComponent(this);
            }
        }

        checkValid() {
            const stateChange = validate(this.props, this.state);
            if(stateChange) {
                this.setState(stateChange);
            }
        }


        render() {

            const { rules, ...componentProps } = this.props;
            const validation = { rules, valid: this.valid, pending: this.pending, errorMessage: this.errorMessage };
            
            if(options.custom) {
                return (
                    <WrappedComponent componentProps={componentProps} validation={validation} />
                )
            }

            const Layout = options.layout; 

            return (
                <Layout {...validation}>
                    <WrappedComponent {...componentProps} />
                </Layout>
            );
            
        }
    };

    return class ContextWrapper extends React.Component {

        render() {            
            return (<ValidationContext.Consumer>
                        {context => <ValidationComponent {...this.props} context={context} />}
                    </ValidationContext.Consumer>
            );
        }
    }
};

export const setDefaultValidateOptions = (options) => {
    defaultOptions = Object.assign({}, defaultOptions, options);
}

export default (options = {}) => {
    return (WrappedComponent) =>  evaluate(WrappedComponent, options)
}