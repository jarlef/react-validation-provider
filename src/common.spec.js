import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ValidationContext from './context';

export const mountWithContext = (WrappedComponent) => {

    const contextProps = {
        registerComponent: sinon.spy(),
        unregisterComponent: sinon.spy(),
        registerSubscriber: sinon.spy(),
        unregisterSubscriber: sinon.spy(),
        update: sinon.spy(),
        isEnabled: () => true
    };    

    const wrapper = mount(        
        <ValidationContext.Provider value={contextProps}>
            {WrappedComponent}
        </ValidationContext.Provider>
    );

    wrapper.validationContext = contextProps;
    return wrapper;
}