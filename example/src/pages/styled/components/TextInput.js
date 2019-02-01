import React from 'react';
import TextField from 'material-ui/TextField';
import { validate } from 'react-validation-provider';

@validate()
class TextInput extends React.Component {
    render() {
        return  ( 
            <TextField {...this.props} errorText={this.props.validation && this.props.validation.errorMessage} />           
        );
    }
}

export default TextInput;