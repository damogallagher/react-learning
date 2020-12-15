import React from '@testing-library/react';
import Backdrop from './Backdrop';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import classes from './Backdrop.module.css';

configure({adapter: new Adapter()});

describe('<Backdrop />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Backdrop clicked={() => {}}/>);
  });

  it('should render <Backdrop /> ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render div with no props passed', () => {
    expect(wrapper.find('.' + classes.Backdrop)).toHaveLength(0);
  });

  it('should not render div with props of show false passed', () => {
    wrapper.setProps({show: false});
    expect(wrapper.find('.' + classes.Backdrop)).toHaveLength(0);
  });

  it('should render div with props of show true passed', () => {
    wrapper.setProps({show: true});
    expect(wrapper.find('.' + classes.Backdrop)).toHaveLength(1);
  });
});
