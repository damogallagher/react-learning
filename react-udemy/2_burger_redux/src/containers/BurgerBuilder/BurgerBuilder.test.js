import React from 'react';
import { BurgerBuilder } from './BurgerBuilder';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should not render <BuildControls /> when receiving no ingredients', () => {        
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });

    it('should not render <BuildControls /> when receiving no ingredients', () => {     
        wrapper.setProps({ings: null});   
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });

    it('should not render <Burger /> when receiving no ingredients', () => {        
        expect(wrapper.find(Burger)).toHaveLength(0);
    });

    it('should not render <Burger /> when receiving no ingredients', () => {     
        wrapper.setProps({ings: null});   
        expect(wrapper.find(Burger)).toHaveLength(0);
    });
    
    it('should render <BuildControls /> when receiving ingredients', () => {        
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
  
    it('should render <Burger /> when receiving ingredients', () => {        
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(Burger)).toHaveLength(1);
    });
});