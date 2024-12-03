import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import SideBar from "../components/Sidebar";
import HeaderNotebookPage from "../components/headers/HeaderNotebookPage";
import { ReactComponent as UpArrow } from '../assets/icons/upArrow.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/close2.svg'
import { ReactComponent as ClearChatIcon } from '../assets/icons/clear.svg'
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg'
import axios from "axios";
import API_URL from '../services/config';
import '../styles/notebookPage.css'
import HumanMessage from "../components/message/HumanMessage";
import BotMessage from "../components/message/BotMessage";
import LoadingPage from "./LoadingPage";

const NotebookPage = () => {
    const { notebookId } = useParams();
    const messagesEndRef = useRef(null);

    const [message, setMessage] = useState([]);
    const [listFile, setListFile] = useState([]);
    const [errorText, setErrorText] = useState("");
    const [notebookName, setNotebookName] = useState("");
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const [isCheckedAll, setCheckedAll] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [showClearChatModal, setShowClearChatModal] = useState(false)
    const [listFileIdSelected, setListFileIdSelected] = useState(["sample"]);

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    useEffect(() => {
        fetchData();
        fetchMessage();
    }, [])

    useEffect(() => {
        selectAllFile();
    }, [isCheckedAll])

    const selectAllFile = () => {
        if (isCheckedAll) {
            const current_list = listFileIdSelected.push(...listFile.map(file => file.file_id));
            setListFileIdSelected(current_list);
        }
        else {
            setListFileIdSelected(["sample"]);
        }
    }

    const selectFile = (file_id) => {
        console.log(file_id)
        setListFileIdSelected([...listFileIdSelected, file_id])
    }

    const unselectFile = (file_id) => {
        console.log("remove " + file_id)
        setListFileIdSelected(listFileIdSelected.filter(file => file !== file_id))
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchData = async () => {
        setLoading(true)
        if (localStorage.getItem('token')) {
            try {
                const response = await axios.get(`http://${API_URL}/notebook/all_files/${notebookId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        withCredentials: true,
                    }
                )

                if (response.status === 200) {
                    setListFile(response.data)
                }

                const response2 = await axios.get(`http://${API_URL}/notebook/name/${notebookId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        withCredentials: true,
                    }
                )

                if (response2.status === 200) {
                    setNotebookName(response2.data)
                }

            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const fetchMessage = async () => {
        if (localStorage.getItem('token')) {
            try {
                const response = await axios.get(`http://${API_URL}/notebook/all_messages/${notebookId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        withCredentials: true,
                    }
                )

                if (response.status === 200) {
                    setMessage(response.data)
                    console.log(response.data)
                }

            }
            catch (err) {
                console.log(err)
            }
        }

        setLoading(false)
    }

    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            receiveBotMessage();
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const receiveBotMessage = async () => {
        const humanMessage = document.querySelector('input.chat-input').value;
        const newUMsg = {
            message_id: "a",
            content: humanMessage
        };

        setMessage([...message, newUMsg]);
        document.querySelector('input.chat-input').value = ""
        if (humanMessage === "") {
            return
        }

        const data = {
            notebook_id: notebookId,
            message: humanMessage,
            file_id: listFileIdSelected
        }

        if (localStorage.getItem('token')) {
            try {
                const response = await axios.post(`http://${API_URL}/notebook/send_message`, data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        withCredentials: true,
                    }
                )
                if (response.status === 200) {
                    const newBMsg = {
                        message_id: "b",
                        content: response.data
                    }
                    setMessage([...message, newUMsg, newBMsg]);
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const clearChat = async () => {
        setLoading(true)
        if (localStorage.getItem('token')) {
            try {
                const response = await axios.delete(`http://${API_URL}/notebook/message_history/${notebookId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true
                });
                if (response.status === 200) {
                    setMessage([]);
                    setShowClearChatModal(false)
                }
                else {
                    console.log(response)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        setLoading(false)
    }

    const uploadFileDialogOpen = () => {
        document.getElementById("upload-file").click();
    }
    const uploadFile = async (e) => {
        e.preventDefault()
        setErrorText("")
        const file = e.target.files[0];
        handleUploadAPICall(file)
    }

    const handleUploadAPICall = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('notebook_id', notebookId)
        try {
            const response = await axios.post(`http://${API_URL}/notebook/upload_file?notebook_id=${notebookId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        accept: 'application/json',
                    },
                    withCredentials: true,
                });
            if (response.status === 200) {
                setListFile([...listFile, response.data])
                setShowUploadModal(false)
            }
            else {
                setErrorText("Invalid file type. Only docx, pdf are allowed")
            }
        }
        catch (err) {
            console.log(err)
            setErrorText("Invalid file type. Only docx, pdf are allowed")
        }
    }

    return (
        isLoading ? <LoadingPage /> :
            <div className="notebook-page">
                <SideBar isOpen={sidebarOpen}
                    toggleSidebar={handleViewSidebar}
                    notebookId={notebookId}
                    listFile={listFile}
                    isCheckedAll={isCheckedAll}
                    setCheckedAll={setCheckedAll}
                    addFileFunc={selectFile}
                    removeFileFunc={unselectFile}
                    openModalFunc={setShowUploadModal} />
                <div className="notebook-page-content">
                    <HeaderNotebookPage onClick={handleViewSidebar} name={notebookName} notebookId={notebookId} />
                    <div className="message-field">
                        <div className="message-box">
                            {
                                message.map((message, index) => {
                                    if (message.message_id.startsWith('b')) {
                                        return <BotMessage key={index} message={message.content} />
                                    }
                                    else {
                                        return <HumanMessage key={index} message={message.content} />
                                    }
                                })
                            }
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="chat-field">
                            <button className="clear-chat-button"
                                onClick={() => setShowClearChatModal(true)}>
                                <ClearChatIcon width={25} height={25} />
                            </button>
                            <div className="chatbox">
                                <input type="text"
                                    onKeyDown={handleKeyPress}
                                    className="chat-input"
                                    placeholder="Type your message" />
                                <button onClick={receiveBotMessage}>
                                    <UpArrow width={25} height={25} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    showUploadModal ?
                        <div className="notebook-page-modal-container">
                            <div className="notebook-page-modal"
                                style={{
                                    width: "50%",
                                    height: "60%",
                                    minWidth: 500,
                                    minHeight: 300
                                }}>
                                <button onClick={() => setShowUploadModal(false)}>
                                    <CloseIcon className="close-icon" width={35} height={35} />
                                </button>

                                <p className="modal-title">Add file source</p>
                                <div className="upload-click-field"
                                    onClick={uploadFileDialogOpen}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}>
                                    <div className="upload-button">
                                        <UploadIcon width={50} height={50} />
                                    </div>
                                    <p style={{ fontSize: "20px" }}>
                                        Upload your .pdf or .docx file
                                    </p>
                                    <p>Drag and drop or select a file to upload</p>
                                    <p className="error-text">{errorText}</p>
                                </div>
                            </div>

                        </div>
                        : null
                }
                {
                    showClearChatModal ?
                        <div className="notebook-page-modal-container">
                            <div className="notebook-page-modal"
                                style={{
                                    width: "30%",
                                    minWidth: 500,
                                    height: 100
                                }}>
                                <p className="clear-chat-title">
                                    Are you sure you want to clear the chat history?</p>
                                <div className="clear-chat-modal-button">
                                    <div onClick={clearChat}>Yes</div>
                                    <div onClick={() => setShowClearChatModal(false)}>No</div>
                                </div>
                            </div>
                        </div>
                        : null
                }

                <input id="upload-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={uploadFile}
                />
            </div>
    )
}

export default NotebookPage