import React from '@testing-library/react';
import Spinner from './Spinner';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Spinner />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });

  it('should render <Spinner /> div', () => {
    wrapper.setProps({show: true});
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
