import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import scope from './scope';
import isValid from './isValid';
import validate from './validate';

export const required = (message = 'Required') => {
    return {
        validate: value => {
            return value != null && !!value.trim();
        },
        hint: () => {
            return message;
        }
    };
};


@scope()
@isValid()
class SomeForm extends React.Component {
    render() {
        return <div className="form"><span>Is valid: {this.props.isValid}</span>{this.props.children}</div>;
    }
}

@validate() 
class SomeInput extends React.Component {
    render() {
        return <input {...this.props} />;
    }
}

@scope()
class SomeStateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <div className="form">
                <SomeInput value={this.state.value} onChange={e => this.setState({ value: e.target.value })} rules={[required]} />
            </div>);
    }
}


describe('scope', () => {
    it('empty scope should be valid', () => {
        const wrapper = mount(<SomeForm />);
        expect(wrapper.find('ValidationScope').instance().valid).to.be.true;
    })
    
    it('scope with components without rule should be valid', () => {
        const wrapper = mount(<SomeForm><SomeInput /></SomeForm>);
        expect(wrapper.find('ValidationScope').instance().valid).to.be.true;
    })
   
    it('scope with valid components should be valid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="foo" onChange={f => f} rules={[required]} /></SomeForm>);        
        expect(wrapper.find('ValidationScope').instance().valid).to.be.true;
    })

    it('scope with invalid component should be invalid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="" onChange={f => f} rules={[required]} /></SomeForm>);        
        expect(wrapper.find('ValidationScope').instance().valid).to.be.false;
    })

    it('scope state is updated when component validation changes', () => {
        const wrapper = mount(<SomeStateForm />);
        const validation = wrapper.find("ValidationScope").instance();
        const form = wrapper.find("SomeStateForm");

        expect(validation.valid).to.be.false;    
        form.setState({ value: "Some value"});
        expect(validation.valid).to.be.true; 
    })

   
})