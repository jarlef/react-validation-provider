import React from 'react';
import TextField from '@material-ui/core/TextField';
import { validate } from 'react-validation-provider';

@validate()
class TextInput extends React.Component {
    render() {

        let extraProps = {};

        if(this.props.validation && this.props.validation.errorMessage) {
            extraProps = { error: true, label: this.props.validation.errorMessage };
        }
        return  ( 
            <TextField {...this.props} {...extraProps} />           
        );
    }
}

export default TextInput;