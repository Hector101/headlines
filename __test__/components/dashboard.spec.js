import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Dashboard from '../../src/components/Dashboard';
import Actions from '../../src/flux/actions/Actions';
import localStorageMock from '../../src/__mock__/localStorage';
import store from '../../src/flux/store/store';

window.localStorage = localStorageMock;

describe('Dasdboard component', () => {
  const wrapper = shallow(<Dashboard />);
  wrapper.instance().componentDidMount();
  const spyWillUnount = sinon.spy(Dashboard.prototype, 'componentWillUnmount');
  const spyActionGetArticles = sinon.spy(Actions, 'getArticles');

  describe('should contain', () => {
    it('2 children', () => {
      expect(wrapper.children()).toHaveLength(2);
    });
  });
  describe('state property', () => {
    it('"articles" should initialize with a value null', () => {
      expect(wrapper.state().articles).toBe(null);
    });
    it('"sources" should initialize with an array of length 1', () => {
      expect(wrapper.state().sources.length).toEqual(1);
    });
  });
  describe('#getSingleSource', () => {
    it('should call the getArticles action created when called', () => {
      wrapper.instance().getSingleSource('cnn-news', 'CNN News');
      expect(spyActionGetArticles.called).toBeTruthy();
    });
  });
  describe('#changeSort', () => {
    it('should call the getArticles action created when called', () => {
      wrapper.instance().changeSort('cnn-news', 'genetal');
      expect(spyActionGetArticles.called).toBeTruthy();
    });
  });
  describe('#updateType', () => {
    it('should update component state property "newsType" to "latest"', () => {
      wrapper.instance().updateType('latest');
      expect(wrapper.state().newsType).toBe('latest');
    });
  });
  describe('#updateArticle', () => {
    it('should initialize withe a null value', () => {
      wrapper.instance().updateArticle();
      wrapper.state().articles = store.getArticles();
      expect(store.getArticles()).toBe(null);
    });
    it('should update store with the payload value', () => {
      wrapper.instance().updateState();
      store.setArticles('cnn');
      store.setSources('cnn');
      expect(store.getSources()).toBe('cnn');
      expect(store.getArticles()).toBe('cnn');
    });
  });
  describe('componentWillUnmount', () => {
    it('should be called when component is unmounted', () => {
      wrapper.unmount();
      expect(spyWillUnount.calledOnce).toBe(true);
    });
  });
});
