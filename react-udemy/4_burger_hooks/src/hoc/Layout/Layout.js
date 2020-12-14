import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from 'react-aux'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisiblr] = useState(false);


    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisiblr(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisiblr(!sideDrawerIsVisible);
    }

        return (
            <Aux>
                <Toolbar 
                drawerToggleClicked={sideDrawerToggleHandler} 
                isAuth={props.isAuthenticated}/>
                <SideDrawer
                    open={sideDrawerIsVisible}
                    closed={sideDrawerClosedHandler} 
                    isAuth={props.isAuthenticated}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};
export default connect(mapStateToProps)(Layout);