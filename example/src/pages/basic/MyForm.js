import React from 'react';
import { scope, isValid } from 'react-validation-provider';
import { required, email } from 'react-validation-provider/rules';
import TextInput from './components/TextInput';
import SelectBox from './components/SelectBox';
import Submit from './components/Submit';
import { notScott } from '../../rules/notScott'; //custom rules
console.log(required);
import SubForm from './SubForm';

@scope({ manual: false })
@isValid()
class MyForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { name: 'scott', email: '', city: ''};
    }

    submit() {
        alert(JSON.stringify(this.state));
    }

    render() {

        const status = this.props.isValid ? 'Yes' : 'No';

        const emailRules = !!this.state.name && this.state.name.trim() ? [required, email] : [];      
        
        return (
             <div className="form">

                <div className="form-element">
                    <label>Name:</label>
                    <TextInput value={this.state.name} 
                            onChange={(ev) => this.setState({name: ev.target.value})}
                            rules={[required('Name is required'), notScott]} />
                </div>


                <div className="form-element">
                    <label>Email:</label>
                    <TextInput value={this.state.email} 
                            onChange={(ev) => this.setState({email: ev.target.value})}
                            rules={emailRules} />
                </div>
                <div className="form-element">
                    <label>City:</label>
                    <SelectBox value={this.state.city} 
                            onChange={(ev) => this.setState({city: ev.target.value})}
                            rules={[required]}>
                            <option value="">Choose your city</option>
                            <option value="London">London</option>
                            <option value="New York">New York</option>
                            <option value="Paris">Paris</option>
                    </SelectBox>
                </div>

                <SubForm />                

                <p>Is valid: {status}</p>
                <Submit onSubmit={() => this.submit()} />

        </div>
        )
    }
}
export default MyForm;