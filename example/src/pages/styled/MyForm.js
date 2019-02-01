import React from 'react';
import { scope, isValid } from 'react-validation-provider';

import TextInput from './components/TextInput';
import Submit from './components/Submit';
import { required, email } from '../../rules';

@scope({ manual: true })
@isValid()
class MyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: 'scott', email: '' };
    }

    submit() {
        alert(JSON.stringify(this.state));
    }

    render() {

        const status = this.props.isValid ? 'Yes' : 'No';    
        
        return (
             <div className="form">
                <div className="form-element">
                    <label>Name:</label>
                    <TextInput id="name" value={this.state.name} 
                               onChange={(ev) => this.setState({name: ev.target.value})}
                               rules={[required('Name is required')]} />
                </div>


                <div className="form-element">
                    <label>Email:</label>
                    <TextInput id="email" value={this.state.email} 
                               onChange={(ev) => this.setState({email: ev.target.value})}
                               rules={[required, email]} />
                </div>                               

                <p>Is valid: {status}</p>
                <Submit onSubmit={() => this.submit()} />
            </div>
        );
    }
}

export default MyForm;