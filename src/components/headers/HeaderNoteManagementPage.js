import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ReactComponent as CloseIcon } from '../../assets/icons/close2.svg'
import API_URL from '../../services/config'

const HeaderNoteManagementPage = (props) => {
    const navigate = useNavigate();
    const modalRef = useRef();
    const buttonRef = useRef();
    const [showUserInfo, setShowUserInfo] = useState(false)
    const [showCreateNotebookModal, setShowCreateNotebookModal] = useState(false)

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)
            && buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowUserInfo(false)
        }
    }

    const handleCreateSubmit = async (e) => {
        props.setLoading(true)
        e.preventDefault()
        try {
            const response = await axios.put(`http://${API_URL}/notebook/create_notebook`, {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true,
                    params: {
                        title: e.target.notebookName.value
                    }
                }
            )
            if (response.status === 200) {
                toast("Notebook " + e.target.notebookName.value + " created successfully", { type: "success" })
                navigate(`/notebook/${response.data.notebook_id}`)
            }
        }
        catch (err) {
            console.log(err)
            toast("Cannot create notebook!", { type: "error" })
        }
        props.setLoading(true)
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
                <button className='addNoteBtn' onClick={() => {
                    setShowCreateNotebookModal(true)
                }}>
                    <i>+</i>
                    <p>Add new AI note</p>
                </button>
                <button className='infoBtn' onClick={() => {
                    setShowUserInfo(!showUserInfo)
                }} ref={buttonRef}></button>
            </div>
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
                            toast("Log out successfully!", { type: "success" })
                        }
                    }>Log out</button>
                </div> : null
            }

            {
                showCreateNotebookModal ?
                    <div className="create-notebook-modal">
                        <form onSubmit={handleCreateSubmit}>
                            <button className='close-modal' onClick={() => {
                                setShowCreateNotebookModal(false)
                            }}>
                                <CloseIcon width={35} height={35} />
                            </button>

                            <div>
                                <p>Notebook name</p>
                                <input type="text" id="notebookName" defaultValue={"Untitled notebook"} />
                            </div>

                            <button type='submit' className='submit-btn'>Create</button>
                        </form>

                    </div> : null
            }
        </div>
    )
}

export default HeaderNoteManagementPage