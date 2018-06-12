import React from 'react';
import { validate } from 'react-validation-provider';

import TextInput from './components/TextInput';
import { required, minimumLength } from '../../rules';

//const Password = validate()((props) => <input type="password" {...props} />);
const Password = (props) => <input type="password" {...props} />;

export default class SubForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { foreigner: true, country: '', password: 'test'};
    }

    renderForeigner() {
        return ( 
            <div className="form-element">
                    <label>Foreigner:</label>
                    <input type="checkbox" checked={this.state.foreigner} onChange={(ev)=> this.setState({ foreigner: ev.target.checked})} />
            </div>
        );
    }
    renderCountry() {

        if(!this.state.foreigner) {
            return null;
        }
        return(
             <div className="form-element">
                <label>Country:</label>
                <TextInput value={this.state.country} 
                            onChange={(ev) => this.setState({country: ev.target.value})}
                            rules={[required]} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderForeigner()}
                {this.renderCountry()}     
                <div className="form-element">
                    <label>Password:</label>
                    <Password value={this.state.password} 
                              onChange={(ev) => this.setState({ password: ev.target.value})}
                              rules={[required, minimumLength(8, 'Password must be greater than 8 characters')]} /> 
                </div>
            </div>              
        )
    }
}