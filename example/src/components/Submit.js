import React from 'react';
import { trigger, isValid } from '../../../src';

@trigger()
@isValid()
export default class Submit extends React.Component {
    render() {
        return  ( 
            <button disabled={!this.props.isValid} onClick={() => this.props.validate(() => this.props.onSubmit())}>Submit</button> 
        );
    }
}