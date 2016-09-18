import React from 'react';
import { trigger } from '../../../src';

@trigger()
export default class Submit extends React.Component {
    render() {
        return  ( 
            <button onClick={() => this.props.validation.validate(() => this.props.onSubmit())}>Submit</button> 
        );
    }
}