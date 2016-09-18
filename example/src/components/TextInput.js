import React from 'react';
import { validate } from '../../../src';
import Error from './Error';

@validate()
export default class TextInput extends React.Component {
    render() {
        return  ( 
            <input type='text' {...this.props} />           
        );
    }
}