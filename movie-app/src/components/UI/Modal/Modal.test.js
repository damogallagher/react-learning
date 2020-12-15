import React from '@testing-library/react';
import Modal from './Modal';
import Backdrop from '../Backdrop/Backdrop';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Modal />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Modal modalClosed={() => {}}/>);
  });

  it('should render <Modal /> and <Backdrop> 1', () => {
    expect(wrapper).toMatchSnapshot();
    console.log(wrapper.find(Backdrop));
    expect(wrapper.find(Backdrop)).toHaveLength(1);
  });
  it('should render <Modal /> and  <Backdrop> 2', () => {
    wrapper.setProps({show: false});
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Backdrop)).toHaveLength(1);
  });

  it('should render <Modal /> and <Backdrop> 3', () => {
    wrapper.setProps({show: true});
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Backdrop)).toHaveLength(1);
  });
});
