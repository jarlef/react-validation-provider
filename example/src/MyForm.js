import React from 'react';
import './MyForm.css';
import { customScope } from './scopes';
import TextInput from './components/TextInput';
import SelectBox from './components/SelectBox';
import Submit from './components/Submit';
import { required, email } from './rules';
import SubForm from './SubForm';

@customScope
export default class MyForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { name: "scott", email: "", city: ""};
    }

    submit() {
        alert(JSON.stringify(this.state));
    }

    render() {
    
        const validStatus = this.props.validation.valid ? "Yes": "No";

        return (
             <div className="form">

                <div className="form-element">
                    <label>Name:</label>
                    <TextInput value={this.state.name} 
                            onChange={(ev) => this.setState({name: ev.target.value})}
                            rules={[required("Navn er obligatorisk")]} />
                </div>


                <div className="form-element">
                    <label>Email:</label>
                    <TextInput value={this.state.email} 
                            onChange={(ev) => this.setState({email: ev.target.value})}
                            rules={[required, email]} />
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

                {/*<button disabled={!this.props.validation.valid} onClick={() => this.submit()}>Submit</button>*/}
                <Submit onSubmit={() => this.submit()} />

                <br />
                <br />
                <div>
                    Is valid: {validStatus}
                </div>
        </div>
        )
    }
}
