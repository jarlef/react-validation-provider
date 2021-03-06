import React from 'react';
import ReactDOM from 'react-dom';
import { trigger } from 'react-validation-provider';
import scrollToElement from 'scroll-to-element';
import Button from '@material-ui/core/Button';

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
            <Button variant="contained" color="primary" onClick={() => this.props.validate(() => this.props.onSubmit(), (components) => errorHandler(components))}>
                Submit
            </Button> 
        );
    }
}

export default Submit;