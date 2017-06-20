import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import MainBar from '../../src/components/Mainbar';
import articles from '../../src/__mock__/articles.json';
import updatedArticles from '../../src/__mock__/updatedArticles.json';

describe('Mainbar component', () => {
  const wrapper = shallow(<MainBar articles={articles.articles} newsType={'techcrunch'} />);
  const spyComponentWillRecieveProps = sinon.spy(MainBar.prototype, 'componentWillReceiveProps');

  it('componentWillReceiveProps should not called until props updates', () => {
    expect(spyComponentWillRecieveProps.called).toBe(false);
  });
  it('componentWillReceiveProps should be called when prop changes', () => {
    wrapper.setProps({
      articles: updatedArticles.articles,
      newsType: 'cnn',
    });
    expect(spyComponentWillRecieveProps.called).toBe(true);
  });
});
