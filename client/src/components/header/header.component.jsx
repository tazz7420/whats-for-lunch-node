import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LunchIcon } from '../../assets/lunch-svgrepo-com.svg'

import './header.styles.scss';


const Header = () => {
    const [hidden, setHidden] = useState(false)
    const handleclick = (event) => {
        setHidden(!hidden)
    }

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
                <Link className='option' to="/about">About</Link>
                <Link className='option2' to="/news">News</Link>
                <Link className='option' to="/googlemappage">Map</Link>
                <Link className='option2' to="/contact">Contact</Link>
                <Link className='option2' to="/sign-in">Sign in</Link>
                <div className='dropdown' onClick={handleclick}>menu
                    <Link className='dropdown-content' to="/about" style={{display: hidden ? 'none' : '' }}>About</Link>
                    <Link className='dropdown-content2' to="/"style={{display: hidden ? 'none' : '' }}>News</Link>
                    <Link className='dropdown-content' to="/googlemappage" onClick={handleclick} style={{display: hidden ? 'none' : '' }}>Map</Link>
                    <Link className='dropdown-content2' to="/" style={{display: hidden ? 'none' : '' }}>Contact</Link>
                    <Link className='dropdown-content2' to="/" style={{display: hidden ? 'none' : '' }}>Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;