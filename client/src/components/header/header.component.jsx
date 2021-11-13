import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LunchIcon } from '../../assets/lunch-svgrepo-com.svg'

import './header.styles.scss';

const Header = () => {

    return (
        <div className='header'>
            <Link className='logo-container' to="/">
                <LunchIcon className='lunch-icon' />
                <div className='logo-text'>
                    <div>WHAT'S</div>
                    <div>FOR</div>
                    <div>LUNCH</div>
                </div>
            </Link>
            <div className='options'>
                <Link className='option2' to="/about">About</Link>
                <Link className='option2' to="/news">News</Link>
                <Link className='option' to="/googlemappage">Map</Link>
                <Link className='option2' to="/contact">Contact</Link>
                <Link className='option2' to="/sign-in">Sign in</Link>
                <div className='dropdown'>menu
                    <Link className='dropdown-content2' to="/">About</Link>
                    <Link className='dropdown-content2' to="/">News</Link>
                    <Link className='dropdown-content' to="/googlemappage">Map</Link>
                    <Link className='dropdown-content2' to="/">Contact</Link>
                    <Link className='dropdown-content2' to="/">Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;