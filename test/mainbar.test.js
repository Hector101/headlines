import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Mainbar from '../src/components/Mainbar';
import Actions from '../src/flux/actions/Actions';

import mockSources from '../src/__mock__/sources.json';
import mockArticles from '../src/__mock__/articles';

describe('Mainbar component', () => {
  const wrapper = shallow(<Mainbar articles={mockSources.sources} />);
  const spyComponentWillReceiveProps = sinon.spy(Mainbar.prototype, 'componentWillReceiveProps');
  wrapper.state = {
    articles: [{ init: true, id: '1' }],
    selectedArticle: [],
    newsType: 'Top',
  };

  it('should recieve a props named articles and should Be an Array', () => {
    expect(wrapper.instance().props.articles instanceof Array).toBeTruthy();
  });
  it('should call componentWillReceiveProps at least once', () => {
    expect(spyComponentWillReceiveProps.called).toBeTruthy();
  });
});
