import { expect } from 'chai';
import { isFunction } from './utils';

describe('utils', () => {
  describe('isFunction', () => {
    it('should return true when passing in a function', () => {
      const result = isFunction(function foo() {});
      expect(result).to.be.true;
    });

    it('should return true when passing in a arrow function', () => {
      const result = isFunction(() => {});
      expect(result).to.be.true;
    });

    it('should return false when passing in null', () => {
      const result = isFunction(null);
      expect(result).to.be.false;
    });

    it('should return false when passing in object', () => {
      const result = isFunction({});
      expect(result).to.be.false;
    });
  });
});
