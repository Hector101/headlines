import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Dashboard from '../../src/components/Dashboard';
import Actions from '../../src/flux/actions/Actions';
import localStorageMock from '../../src/__mock__/localStorage';
import store from '../../src/flux/store/store';

describe('Dasdboard component\'s', () => {
  const wrapper = shallow(<Dashboard />);
  const spyDidMount = sinon.spy(Dashboard.prototype, 'componentDidMount');
  const spyWillUnount = sinon.spy(Dashboard.prototype, 'componentWillUnmount');
  const spyActionGetArticles = sinon.spy(Actions, 'getArticles');
  window.localStorage = localStorageMock;
  // Mock Dashboard component inital state
  wrapper.state = {
    sources: [],
    articles: [],
    newsType: 'top',
  };

  it('children should be 2', () => {
    expect(wrapper.children()).toHaveLength(2);
  });
  it('componentDidMount should be called after mount', () => {
    wrapper.instance().componentDidMount();
    expect(spyDidMount.calledOnce).toBe(true);
  });
  it('state property "articles" should initialize with an empty object', () => {
    expect(wrapper.state.articles).toHaveLength(0);
  });
  it('state property "sources" should initialize with an empty object', () => {
    expect(wrapper.state.sources).toHaveLength(0);
  });
  it('getSingleArticle method should call the getArticles action created when called', () => {
    wrapper.instance().getSingleArticle('cnn-news', 'CNN News');
    expect(spyActionGetArticles.called).toBeTruthy();
  });
  it('changeSort method should call the getArticles action created when called', () => {
    wrapper.instance().changeSort('cnn-news', 'genetal');
    expect(spyActionGetArticles.called).toBeTruthy();
  });
  it('When updateType is called, the component state updates to "latest"', () => {
    wrapper.instance().updateType('latest');
    wrapper.state = {
      newsType: 'latest',
    };
    expect(wrapper.state.newsType).toBe('latest');
  });
  it('When updateArticle is called, the component state updates to from store which is still null', () => {
    wrapper.instance().updateArticle();
    wrapper.state = {
      articles: store.getArticles(),
    };
    expect(store.getArticles()).toBe(null);
  });
  it('When updateArticle is called, the component state updates to from store which is still null', () => {
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
  it('componentWillUnmount should be called when component is unmounted', () => {
    wrapper.unmount();
    expect(spyWillUnount.calledOnce).toBe(true);
  });
});
