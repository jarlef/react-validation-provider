import React from 'react';
import { validate } from '../../../src';
import Error from './Error';

@validate({ custom: true })
export default class SelectBox extends React.Component {
    render() {
        return (
              <div>
                    <select {...this.props.componentProps} />
                    <Error validation={this.props.validation} />
                </div>
            );
    }
}
