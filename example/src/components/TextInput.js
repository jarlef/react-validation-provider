import React from 'react';
import { validate } from '../../../src';
import Error from './Error';

class Input extends React.Component {
    render() {
        return  ( 
            <div>
                <input type='text' {...this.props.props} />
                <Error validation={this.props.validation} />
            </div>
        );
    }
}

export default validate(Input);