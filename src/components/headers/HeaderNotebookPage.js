import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../services/config';

function HeaderNotebookPage(props) {
    const navigate = useNavigate();
    const modalRef = useRef();
    const buttonRef = useRef();
    const [currentName, setCurrentName] = useState(props.name);
    const [showUserInfo, setShowUserInfo] = useState(false)

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)
            && buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowUserInfo(false)
        }
    }

    async function handleChangeName() {
        const name = document.querySelector('.notebook-name').value;
        if (name !== currentName) {
            try {
                const response = await axios.patch(`http://${API_URL}/notebook/rename`, {
                    notebook_id: props.notebookId,
                    title: name
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        withCredentials: true,
                    }
                )
                if (response.status === 200) {
                    setCurrentName(name);
                    console.log("rename success")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showUserInfo])

    return (
        <div className='header-notebook-page'>
            <input type='text' className="notebook-name" defaultValue={props.name} onBlur={handleChangeName} />
            <button className='infoBtn' onClick={() => {
                setShowUserInfo(!showUserInfo)
            }} ref={buttonRef}></button>
            {showUserInfo ?
                <div className='user-info' ref={modalRef}>
                    <p className="name">
                        PHUNG MINH CHIEN
                    </p>
                    <p className="email">
                        phungminhchien09100203@gmail.com
                    </p>

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
    );
};

export default HeaderNotebookPage;