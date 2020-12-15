import React from '@testing-library/react';
import MovieListHeading from './MovieListHeading';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<MovieListHeading />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MovieListHeading heading='test'/>);
  });

  it('should render <MovieListHeading /> ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
