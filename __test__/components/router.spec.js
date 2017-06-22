
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Router from '../../src/router/Router';
import localStorageMock from '../../src/__mock__/localStorage';
import Auth from '../../src/auth/auth';

window.localStorage = localStorageMock;
localStorage.setItem('auth', true);

describe('Router component', () => {
  const wrapper = mount(<Router />);
  const spyWillUnount = sinon.spy(Router.prototype, 'componentWillUnmount');

  describe('state', () => {
    it('shoule be "true" if user is authenticated', () => {
      expect(wrapper.state().auth).toEqual(true);
    });
    it('shoule be "true" if user is not authenticated ', () => {
      localStorage.removeItem('auth');
      wrapper.instance().updateAuth();
      wrapper.setState({
        auth: Auth.ifLoggedin(),
      });
      expect(wrapper.state().auth).toBe(false);
    });
  });
  describe('componentWillUnmount', () => {
    it('should be called once when component unmounts', () => {
      wrapper.unmount();
      expect(spyWillUnount.calledOnce).toBe(true);
    });
  });
});
