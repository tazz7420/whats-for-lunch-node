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
                <Link className='option2' to="/about">About</Link>
                <Link className='option' to="/news">News</Link>
                <Link className='option' to="/googlemappage">What's for lunch</Link>
                <Link className='option2' to="/contact">Contact</Link>
                <Link className='option2' to="/sign-in">Sign in</Link>
                <div className='dropdown' onClick={handleclick}>menu
                    <Link className='dropdown-content2' to="/about" style={{display: hidden ? 'none' : '' }}>About</Link>
                    <Link className='dropdown-content' to="/news"style={{display: hidden ? 'none' : '' }}>News</Link>
                    <Link className='dropdown-content' to="/googlemappage" style={{display: hidden ? 'none' : '' }}>What's for lunch</Link>
                    <Link className='dropdown-content2' to="/" style={{display: hidden ? 'none' : '' }}>Contact</Link>
                    <Link className='dropdown-content2' to="/" style={{display: hidden ? 'none' : '' }}>Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;