import React from 'react';
import { validate } from '../../../src';
import Error from './Error';

class SelectBox extends React.Component {
    render() {
        return (
              <div>
                    <select {...this.props.props} />
                    <Error validation={this.props.validation} />
                </div>
            );
    }
}

export default validate(SelectBox);