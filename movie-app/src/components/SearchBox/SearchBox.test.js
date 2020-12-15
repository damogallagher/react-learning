import React from '@testing-library/react';
import SearchBox from './SearchBox';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<SearchBox />', () => {
  let wrapper;
  let onSearchMock;
  beforeEach(() => {
    onSearchMock = jest.fn();
    wrapper = shallow(<SearchBox value='test' setSearchValue={onSearchMock}/>);
  });

  it('should render <SearchBox /> ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call <SearchBox /> onChange prop', () => {
    const event = {
      preventDefault() {},
      target: {value: 'the-value'},
    };

    wrapper.find('input').simulate('change', event);
    expect(onSearchMock).toBeCalledWith('the-value');
  });
});
