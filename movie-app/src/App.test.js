import React from '@testing-library/react';
import App from './App';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppContainer from './containers/AppContainer';
configure({adapter: new Adapter()});

describe('<App />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render <AppContainer /> 1', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <AppContainer /> 2', () => {
    expect(wrapper.find(AppContainer)).toHaveLength(1);
  });
});
