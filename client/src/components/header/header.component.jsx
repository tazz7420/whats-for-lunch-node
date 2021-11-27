import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { UserContext } from '../../providers/user/user';
import { ReactComponent as LunchIcon } from '../../assets/lunch-svgrepo-com.svg'
import { firestore } from '../../firebase/firebase.utils';

import './header.styles.scss';


const Header = () => {
    const [hidden, setHidden] = useState(false)
    const { currentUser, changeUser, currentUserId, changeUserId } = useContext(UserContext)

    const handleclick = () => {
        setHidden(!hidden)
    }

    const handleSignIn = async () => {
        signInWithGoogle()
            .then(function (res) {
                changeUser(res.additionalUserInfo.profile.name)
                const displayName = res.additionalUserInfo.profile.name
                const userId = res.additionalUserInfo.profile.id
                firestore.doc(`lunchUser/${userId}`).get()
                    .then(function (res) {
                        if (res.exists) {
                            console.log(userId, res.data().displayName)
                            changeUserId(userId)
                        } else {
                            firestore.doc(`lunchUser/${userId}`).set({
                                displayName: displayName
                            })
                        }
                    })

                // if (!db.exists) {
                //     console.log(res.additionalUserInfo.profile.id)
                // }
            })
    }

    const handleSignOut = () => {
        changeUser('null')
        changeUserId('null')
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
                {currentUser !== 'null' ?
                    <div className='option'
                        onClick={handleSignOut}>
                        <b>{currentUser}</b> (Sign out)
                    </div> :
                    <div className='option'
                        onClick={handleSignIn}>
                        Sign in
                    </div>}
                <div className='dropdown' onClick={handleclick}>menu
                    <Link className='dropdown-content2' to="/about" style={{ display: hidden ? 'none' : '' }}>About</Link>
                    <Link className='dropdown-content' to="/news" style={{ display: hidden ? 'none' : '' }}>News</Link>
                    <Link className='dropdown-content' to="/googlemappage" style={{ display: hidden ? 'none' : '' }}>What's for lunch</Link>
                    <Link className='dropdown-content2' to="/" style={{ display: hidden ? 'none' : '' }}>Contact</Link>
                    {/* <div className='dropdown-content' onClick={handleSignIn} style={{ display: hidden ? 'none' : '' }}>Sign in</div> */}
                    {currentUser !== 'null' ?
                        <div
                            className='dropdown-content'
                            style={{ display: hidden ? 'none' : '' }}
                            onClick={handleSignOut}>
                            <b>{currentUser}</b> (Sign out)
                        </div> :
                        <div
                            className='dropdown-content'
                            style={{ display: hidden ? 'none' : '' }}
                            onClick={handleSignIn}>
                            Sign in
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Header;