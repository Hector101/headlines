import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SidebarCollapse from '../../src/components/SidebarCollapse';
import localStorageMock from '../../src/__mock__/localStorage';
import profileMock from '../../src/__mock__/profile';
import sources from '../../src/__mock__/sources.json';

window.localStorage = localStorageMock;
localStorage.setItem('userDetail', JSON.stringify(profileMock));

describe('Sidebar component', () => {
  const wrapper = shallow(<SidebarCollapse sources={sources.sources} />);
  const spyComponentWillRecieveProps = sinon.spy(SidebarCollapse.prototype, 'componentWillReceiveProps');

  it('componentWillReceiveProps should not called until props updates', () => {
    expect(spyComponentWillRecieveProps.called).toBe(false);
  });
  it('componentWillReceiveProps should be called when prop changes', () => {
    wrapper.setProps({
      sources: sources.sources,
    });
    expect(spyComponentWillRecieveProps.called).toBe(true);
  });
  it('should update state when onChange method is called', () => {
    const a = {
      target: {
        value: 'cnn',
      },
    };
    wrapper.instance().onChange(a);
    expect(wrapper.state().searchInput).toBe('cnn');
  });
  it('should update "sortBysAvailabale" and "id" class variables when setSortBysAvailabale method is called', () => {
    wrapper.instance().setSortBysAvailabale(['top', 'lastest'], 'cnn');
    expect(wrapper.instance().sortBysAvailabale).toEqual(['top', 'lastest']);
    expect(wrapper.instance().id).toEqual('cnn');
  });
});
