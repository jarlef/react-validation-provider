import React from 'react';
import { expect } from 'chai';
import isValid from './isValid';
import mountWithContext from './common.spec';

@isValid()
class SomeContainer extends React.Component {
  render() {
    return null;
  }
}

const IS_VALID_COMPONENT_NAME = 'IsValidComponent';
const CONTAINER_NAME = 'SomeContainer';

describe('isValid', () => {
  describe('when mounting component', () => {
    const wrapper = mountWithContext(<SomeContainer />);
    const container = wrapper.find(CONTAINER_NAME);

    it('should register subscriber', () => {
      expect(wrapper.validationContext.registerSubscriber.called).to.be.true;
    });

    it('should not unregister subscriber', () => {
      expect(wrapper.validationContext.unregisterSubscriber.notCalled).to.be
        .true;
    });

    it('should be default set to invalid', () => {
      expect(container.props().isValid).to.be.false;
    });
  });

  describe('when unmounting component', () => {
    const wrapper = mountWithContext(<SomeContainer />);
    wrapper.unmount();

    it('should unregister subscriber', () => {
      expect(wrapper.validationContext.unregisterSubscriber.called).to.be.true;
    });
  });

  describe('when receiving new valid state', () => {
    const wrapper = mountWithContext(<SomeContainer />);
    wrapper
      .find(IS_VALID_COMPONENT_NAME)
      .instance()
      .setValid(true);
    wrapper.update();
    const container = wrapper.find(CONTAINER_NAME);
    it('should forward validation status to child component', () => {
      expect(container.props().isValid).to.be.true;
    });
  });
});
