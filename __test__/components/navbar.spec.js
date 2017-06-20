import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Navbar from '../../src/components/Navbar';
import Auth from '../../src/auth/auth';
import localStorageMock from '../../src/__mock__/localStorage';

window.localStorage = localStorageMock;


describe('Navber component', () => {
  const wrapper = shallow(<Navbar />);
  const spyAuthSignin = sinon.spy(Auth, 'signIn');
  const spyAuthSignOut = sinon.spy(Auth, 'signOut');
  const spyAuthIfLoggedIn = sinon.spy(Auth, 'ifLoggedin');

  const response = {
    profileObj: {
      email: 'hello.world@email.com',
      familyName: 'John',
      givenName: 'Doe',
      googleId: '5365346545783746733561780',
      imageUrl: 'https://lh5.googleuserconc/photo.jpg',
      name: 'John Doe',
    },
  };
  const onError = {
    error: 'Error occur',
  };

  it('should call the signIn method in Auth object when the GoogleLogin is called', () => {
    wrapper.instance().responseGoogle(response);
    expect(spyAuthSignin.called).toBe(true);
  });
  it('should expect the localStorage key "auth" to be set to "profileObj"', () => {
    wrapper.find('.login').simulate('click');
    wrapper.instance().responseGoogle(response);
    localStorage.setItem('auth', JSON.stringify(response.profileObj));
    expect(JSON.parse(localStorage.getItem('auth'))).toEqual(response.profileObj);
  });
  it('', () => {
    expect(spyAuthIfLoggedIn()).toBe(true);
  });
  it('should expect the localStorage key "auth" to be undefined', () => {
    wrapper.find('.login').simulate('click');
    wrapper.instance().responseGoogle(onError);
    localStorage.removeItem('auth');
    expect(localStorage.auth).toBe(undefined);
  });
  it('should call the signOut method in Auth object when the signOut method is called', () => {
    wrapper.instance().signOut();
    expect(spyAuthSignOut.called).toBe(true);
  });
});
