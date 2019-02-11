import React from 'react';
import { expect } from 'chai';
import validate from './validate';

import { mountWithContext } from './common.spec';

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

class SomeStateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };
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

const validationComponentName = 'ValidationComponent';

describe('validate', () => {

    describe("when mounting component", () => {
        const wrapper = mountWithContext(<SomeInput value="foo" onChange={x => x} />);
        it('should register in scope', () => {
            expect(wrapper.validationContext.registerComponent.called).to.be.true;
        });

        it('should not unregister in scope', () => {
            expect(wrapper.validationContext.unregisterComponent.notCalled).to.be.true;
        });
    });

    describe('when unmounting component', () => {
        const wrapper = mountWithContext(<SomeInput value="foo" onChange={x => x} />);
        wrapper.unmount();
        
        it('should unregister in scope', () => {
            expect(wrapper.validationContext.unregisterComponent.calledOnce).to.be.true;
        });
    });
    
    describe('when no rules provided', () => {
        const wrapper = mountWithContext(<SomeInput value="foo" onChange={x => x} />);

        it('should be valid', () => {
            const validation = wrapper.find(validationComponentName).instance();
            expect(validation.valid).to.be.true;    
        });
    })
    
    describe('when component has a single rule that passes', () => {
        const wrapper = mountWithContext(<SomeInput value="some value" rules={[required]} onChange={x => x} />);
        const validation = wrapper.find(validationComponentName).instance();
        
        it('should be valid', () => {
            expect(validation.valid).to.be.true;    
        });
    });

    describe('when component has a single rule that fails', () => {
        const wrapper = mountWithContext(<SomeInput value="" rules={[required]} onChange={x => x} />);
        const validation = wrapper.find(validationComponentName).instance();
         
        it('should be valid', () => {
            expect(validation.valid).to.be.false;    
        });
    });

    describe('when component has a combination of passing and failing rules', () => {
        const wrapper = mountWithContext(<SomeInput value="foo" rules={[required, isNotFoo]} onChange={x => x} />);
        const validation = wrapper.find(validationComponentName).instance();
         
        it('should be invalid', () => {
            expect(validation.valid).to.be.false;    
        });
    });

    describe('when component has a multiple passing rules', () => {
        const wrapper = mountWithContext(<SomeInput value="bar" rules={[required, isNotFoo]} onChange={x => x} />);
        const validation = wrapper.find(validationComponentName).instance();
         
        it('should be valid', () => {
            expect(validation.valid).to.be.true;    
        });
    });
    
    describe('when value prop changes to valid state', () => {
        const wrapper = mountWithContext(<SomeStateForm />);
        const validation = wrapper.find(validationComponentName).instance();
        const form = wrapper.find("SomeStateForm");

        const originalValidationResult = validation.valid;    
        form.setState({ value: "Some value"});
            
        it('should change validation state', () => {
            expect(originalValidationResult).to.be.false;
            expect(validation.valid).to.be.true;         
        });

        it('should notify scope that validation state has changed', () => {
            expect(wrapper.validationContext.update.calledOnce).to.be.true;
        });
    });

    describe('when value prop changes to invalid state', () => {
        const wrapper = mountWithContext(<SomeStateForm value="foo" />);
        const validation = wrapper.find(validationComponentName).instance();
        const form = wrapper.find("SomeStateForm");

        const originalValidationResult = validation.valid;    
        form.setState({ value: ""});
            
        it('should change validation state', () => {
            expect(originalValidationResult).to.be.true;
            expect(validation.valid).to.be.false;         
        });

        it('should notify scope that validation state has changed', () => {
            expect(wrapper.validationContext.update.calledOnce).to.be.true;
        });
    });

    describe('when value prop does not change validation state', () => {
        const wrapper = mountWithContext(<SomeStateForm value="foo" />);
        const validation = wrapper.find(validationComponentName).instance();
        const form = wrapper.find("SomeStateForm");

        const originalValidationResult = validation.valid;    
        form.setState({ value: "bar"});
            
        it('should not change validation state', () => {
            expect(originalValidationResult).to.be.true;
            expect(validation.valid).to.be.true;         
        });

        it('should not notify scope that validation state has changed', () => {
            expect(wrapper.validationContext.update.notCalled).to.be.true;
        });
    });
})