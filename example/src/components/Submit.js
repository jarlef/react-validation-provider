import React from 'react';
import { trigger } from '../../../src';

@trigger()
export default class Submit extends React.Component {
    render() {
        return  ( 
            <button onClick={() => this.props.validate(() => this.props.onSubmit())}>Submit</button> 
        );
    }
}