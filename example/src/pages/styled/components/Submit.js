import React from 'react';
import ReactDOM from 'react-dom';
import { trigger } from 'react-validation-provider';
import scrollToElement from 'scroll-to-element';
import RaisedButton from 'material-ui/RaisedButton';

const errorHandler = (components) => {
    const component = components[0];
    const element = ReactDOM.findDOMNode(component);

    scrollToElement(element, {
        offset: -50,
        ease: 'out-back',
        duration: 1500
    });
}

@trigger()
class Submit extends React.Component {

    render() {
        return  ( 
            <RaisedButton primary={true} onClick={() => this.props.validate(() => this.props.onSubmit(), (components) => errorHandler(components))} label="Submit" /> 
        );
    }
}

export default Submit;