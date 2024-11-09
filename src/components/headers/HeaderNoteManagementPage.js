import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useEffect, useState, useRef } from 'react';

const HeaderNoteManagementPage = () => {
    const navigate = useNavigate();
    const modalRef = useRef();
    const [showUserInfo, setShowUserInfo] = useState(false)

    function handleClickOutside(event) {
        if (showUserInfo && modalRef.current && !modalRef.current.contains(event.target)) {
            setShowUserInfo(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showUserInfo])

    return (
        <div className='note-page-header'>
            <div className="note-page-header-content">
                <img src={logo} alt="logo" className='logo' />
                <h1 id="app-name">CAIN</h1>
                <button className='addNoteBtn'>
                    <i>+</i>
                    <p>Add new AI note</p>
                </button>
                <button className='infoBtn' onClick={() => {
                    setShowUserInfo(!showUserInfo)
                }}></button>
            </div>
            {showUserInfo ?
                <div className='user-info' ref={modalRef}>
                    <p className="name">
                        PHUNG MINH CHIEN
                    </p>
                    <p className="email">
                        phungminhchien09100203@gmail.com
                    </p>

                    <button className="lightmode">
                        Change to dark mode
                    </button>
                    <button className="about-us">
                        About us
                    </button>
                    <button className='signout' onClick={
                        () => {
                            localStorage.removeItem('token');
                            navigate('/')
                        }
                    }>Sign out</button>
                </div> : null
            }

        </div>
    )
}

export default HeaderNoteManagementPage