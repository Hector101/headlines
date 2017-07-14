import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Sidebar from '../../src/components/Sidebar';
import localStorageMock from '../../src/__mock__/localStorage';
import profileMock from '../../src/__mock__/profile';
import sources from '../../src/__mock__/sources.json';

window.localStorage = localStorageMock;
localStorage.setItem('userDetail', JSON.stringify(profileMock));

describe('Sidebar component', () => {
  const wrapper = shallow(<Sidebar sources={sources.sources} />);
  const spyComponentWillRecieveProps = sinon.spy(Sidebar.prototype, 'componentWillReceiveProps');
  wrapper.instance().setSortBysAvailabale(['top', 'lastest'], 'cnn');

  describe('componentWillRecieveProps', () => {
    it('should not called until props updates', () => {
      expect(spyComponentWillRecieveProps.called).toBe(false);
    });
    it('should be called when prop changes', () => {
      wrapper.setProps({
        sources: sources.sources,
      });
      expect(spyComponentWillRecieveProps.called).toBe(true);
    });
  });
  describe('onChange method', () => {
    it('should update state when called', () => {
      const event = {
        target: {
          value: 'cnn',
        },
      };
      wrapper.instance().onChange(event);
      expect(wrapper.state().searchInput).toBe('cnn');
    });
  });
  describe('#setSortBysAvailabale', () => {
    it('should update sortBysAvailabale instance variable to "[top, lastest]" ', () => {
      expect(wrapper.instance().sortBysAvailabale).toEqual(['top', 'lastest']);
    });
    it('should update id instance variable to "cnn" ', () => {
      expect(wrapper.instance().id).toEqual('cnn');
    });
  });
});
