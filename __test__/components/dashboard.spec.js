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
  const spyDidMount = sinon.spy(Dashboard.prototype, 'componentDidMount');
  const spyWillUnount = sinon.spy(Dashboard.prototype, 'componentWillUnmount');
  const spyActionGetArticles = sinon.spy(Actions, 'getArticles');

  describe('should contain', () => {
    it('2 children', () => {
      expect(wrapper.children()).toHaveLength(2);
    });
  });
  describe('componentDidMount', () => {
    it('should be called once after mount', () => {
      wrapper.instance().componentDidMount();
      expect(spyDidMount.calledOnce).toBe(true);
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
  describe('getSingleSource method', () => {
    it('should call the getArticles action created when called', () => {
      wrapper.instance().getSingleSource('cnn-news', 'CNN News');
      expect(spyActionGetArticles.called).toBeTruthy();
    });
  });
  describe('changeSort method', () => {
    it('should call the getArticles action created when called', () => {
      wrapper.instance().changeSort('cnn-news', 'genetal');
      expect(spyActionGetArticles.called).toBeTruthy();
    });
  });
  describe('updateType is called', () => {
    it('the component state updates to "latest"', () => {
      wrapper.instance().updateType('latest');
      wrapper.state = {
        newsType: 'latest',
      };
      expect(wrapper.state.newsType).toBe('latest');
    });
  });
  describe('updateArticle is called', () => {
    it('the component state updates to from store which is still null', () => {
      wrapper.instance().updateArticle();
      wrapper.state = {
        articles: store.getArticles(),
      };
      expect(store.getArticles()).toBe(null);
    });
    it('the component state updates to from store which is still null', () => {
      wrapper.instance().updateState();
      store.setArticles('cnn');
      store.setSources('cnn');
      wrapper.state = {
        sources: store.getSources(),
        articles: store.getArticles(),
      };
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
