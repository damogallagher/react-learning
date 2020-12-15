import React from '@testing-library/react';
import MovieList from './MovieList';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<MovieList />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MovieList favouriteComponent={() => {}} handleFavouritesClick={() => {}}/>);
  });

  it('should render <MovieList /> if null movies', () => {
    wrapper.setProps({movies: null});
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <MovieList /> if no movies', () => {
    wrapper.setProps({movies: []});
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <MovieList /> if 1 movie', () => {
    wrapper.setProps({movies: [{name: 'Movie 1'}]});
    expect(wrapper).toMatchSnapshot();
  });
  it('should render <MovieList /> if 2 movies', () => {
    wrapper.setProps({movies: [{name: 'Movie 1', imdbID: 1}, {name: 'Movie 2', imdbID: 2}]});
    expect(wrapper).toMatchSnapshot();

    wrapper.find('#action').at(0).simulate('click');
  });
 // it('should render <AppContainer /> 2', () => {
  //  expect(wrapper.find(AppContainer)).toHaveLength(1);
 // });
});
