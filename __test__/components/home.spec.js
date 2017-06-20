import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../src/components/Home';

describe('Home', () => {
  const wrapper = shallow(<Home />);
  it('component has two children', () => {
    expect(wrapper.children()).toHaveLength(2);
  });
});
