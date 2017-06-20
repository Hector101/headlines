
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Router from '../../src/router/Router';
import localStorageMock from '../../src/__mock__/localStorage';
import Auth from '../../src/auth/auth';

window.localStorage = localStorageMock;
localStorage.setItem('auth', true);

describe('React component', () => {
  const wrapper = mount(<Router />);
  const spyWillUnount = sinon.spy(Router.prototype, 'componentWillUnmount');

  it('inital state shoule be "true" if user is logged in', () => {
    expect(wrapper.state().auth).toEqual(true);
  });
  it('inital ', () => {
    localStorage.removeItem('auth');
    wrapper.instance().updateAuth();
    wrapper.setState({
      auth: Auth.ifLoggedin(),
    });
    expect(wrapper.state().auth).toBe(false);
  });
  it('should call componentWillUnmount when component unmounts', () => {
    wrapper.unmount();
    expect(spyWillUnount.calledOnce).toBe(true);
  });
});
