import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavBar.css';

export default function navBar() {
    return (
        <div className="navBackground">
            <div className='upperNavBar'>
                <div className='lights'>
                    <div className='blueLight rem3'/>
                    <div className='greenLight rem1'/>
                    <div className='greenLight rem1'/>
                </div>
                <div className='header-top-border'>
                    <NavLink className='navBarButton' to='/pokedex' activeClassName='activeNavLink'>Pokédex</NavLink>
                    <NavLink className='navBarButton' to='/create' activeClassName='activeNavLink'>Create New</NavLink>
                </div>
            </div>
            <div className='section header-bottom-border'>
                <div className='topBbackground'/>
                <div className='border1'/>
            </div>
        </div>
    )
} 