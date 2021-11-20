import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LunchIcon } from '../../assets/lunch-svgrepo-com.svg'

import './footer.styles.scss';

const Footer = () => {
    const [windowSize, setWindowSize] = useState(window.innerHeight+ window.innerWidth);
    
    const handleRWD = () => {
        if (windowSize !== window.innerHeight+ window.innerWidth) {
            setWindowSize(window.innerHeight+ window.innerWidth)
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleRWD);
        handleRWD();
        return (() => {
            window.removeEventListener('resize', handleRWD);
        })
    }, [windowSize])

    return (
        <div className='footer' style={{top: window.innerHeight*2}}>
            <Link className='logo-container' to="/">
                <LunchIcon className='lunch-icon' />
                <div className='logo-text'>
                    <div><b>WHAT'S FOR LUNCH</b></div>
                </div>
            </Link>
            <div className='options'>
                <Link className='option2' to="/about">About</Link>
                <Link className='option2' to="/news">News</Link>
                <Link className='option' to="/googlemappage">Map</Link>
                <Link className='option2' to="/contact">Contact</Link>
                <Link className='option2' to="/sign-in">Sign in</Link>
            </div>
        </div>
    )
}

export default Footer;