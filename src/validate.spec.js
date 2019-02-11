import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

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

export const isNotFoo = (message = 'No foo allowed') => {
    return {
        validate: value => {
            return !value || value.toLowerCase() !== "foo";
        },
        hint: () => {
            return message;
        }
    };
};


@scope()
class SomeForm extends React.Component {
    render() {
        return <div className="form">{this.props.children}</div>;
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

@validate() 
class SomeInput extends React.Component {
    render() {
        return <input {...this.props}  />;
    }
}

describe('validate', () => {
    it('without rules should be valid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="foo" onChange={x => x} /></SomeForm>);
        const validation = wrapper.find("ValidationComponent").instance();
        expect(validation.valid).to.be.true;    
    })   

    
    it('with one valid rule should be valid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="some value" rules={[required]} onChange={x => x} /></SomeForm>);
        const validation = wrapper.find("ValidationComponent").instance();
        expect(validation.valid).to.be.true;    
    })

    it('with one invalid rule should be invalid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="" rules={[required]} onChange={x => x} /></SomeForm>);
        const validation = wrapper.find("ValidationComponent").instance();
        expect(validation.valid).to.be.false;    
    })

    it('with combination of valid and invalid rules should be invalid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="foo" rules={[required, isNotFoo]} onChange={x => x} /></SomeForm>);
        const validation = wrapper.find("ValidationComponent").instance();
        expect(validation.valid).to.be.false;    
    })

    it('with multiple valid rules should be valid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="bar" rules={[required, isNotFoo]} onChange={x => x} /></SomeForm>);
        const validation = wrapper.find("ValidationComponent").instance();
        expect(validation.valid).to.be.true;    
    })

    it('revalidates when value props change', () => {
        const wrapper = mount(<SomeStateForm />);
        const validation = wrapper.find("ValidationComponent").instance();
        const form = wrapper.find("SomeStateForm");

        expect(validation.valid).to.be.false;    
        form.setState({ value: "Some value"});
        expect(validation.valid).to.be.true; 
        
    })
})