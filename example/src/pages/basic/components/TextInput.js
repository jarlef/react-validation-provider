import React from 'react';
import { validate } from 'react-validation-provider';

@validate()
class TextInput extends React.Component {
    render() {
        return  ( 
            <input type="text" {...this.props} />           
        );
    }
}

export default TextInput;