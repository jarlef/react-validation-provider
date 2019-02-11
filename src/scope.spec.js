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

const scopeName = 'ValidationScope';

describe('scope', () => {

    describe('when scope is empty', () => {
        const wrapper = mount(<SomeForm />);
        const scope = wrapper.find(scopeName).instance();
        it('empty scope should be valid', () => {
            expect(scope.valid).to.be.true;
        })
    });
    
    describe('when scope contains components without rules', () => {
        const wrapper = mount(<SomeForm><SomeInput /></SomeForm>);
        const scope = wrapper.find(scopeName).instance();
        it('should result in valid scope', () => {
            expect(scope.valid).to.be.true;
        });
    })
   
    describe('when scope contains a component that is valid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="foo" onChange={f => f} rules={[required]} /></SomeForm>);        
        const scope = wrapper.find(scopeName).instance();
           
        it('should result in valid scope', () => {
            expect(scope.valid).to.be.true;
        });
    });
    
    describe('when scope contains a component that is invalid', () => {
        const wrapper = mount(<SomeForm><SomeInput value="" onChange={f => f} rules={[required]} /></SomeForm>);        
        const scope = wrapper.find(scopeName).instance();
           
        it('should result in invalid scope', () => {
            expect(scope.valid).to.be.false;
        });
    });

    describe('when all components changes to valid', () => {
        const wrapper = mount(<SomeStateForm />);
        const scope = wrapper.find(scopeName).instance();
        const form = wrapper.find("SomeStateForm");

        const originalValidationState = scope.valid;
        form.setState({ value: "Some value"});
    
        it('should change scope to valid', () => {
            expect(originalValidationState).to.be.false;
            expect(scope.valid).to.be.true; 
        });
    });
})