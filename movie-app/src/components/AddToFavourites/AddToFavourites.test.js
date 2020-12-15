import React from '@testing-library/react';
import AddToFavourites from './AddToFavourites';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<AddToFavourites />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AddToFavourites />);
  });

  it('should render Svg', () => {
    expect(wrapper).toMatchSnapshot();
  });

//   it('should render Svg 2', () => {
//       console.log(wrapper.find('.mr-2')).at(0);
//     expect(wrapper.find('#addToFavourites')).toContain('Add to Favourites');
//     expect(wrapper.find('span.mr-2')).toContain('Add to Favourites');
//   });
});
