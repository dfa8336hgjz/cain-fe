import { useEffect, useState } from "react";
import GridNoteList from "../components/GridNotebookList";
import HeaderNoteManagementPage from "../components/headers/HeaderNoteManagementPage";
import LoadingPage from "./LoadingPage";
import '../styles/notebookManagementPage.css'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import API_URL from "../services/config";
import axios from "axios";

const NotebookManagementPage = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [recentData, setRecentData] = useState([])
    const [data, setData] = useState([])

    const [deleteItem, setDeleteItem] = useState(null);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.get(`http://${API_URL}/user/all_notebooks`,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            withCredentials: true,
                        }
                    )
                    if (response.status === 200) {
                        setData(response.data)
                    }

                    const response2 = await axios.get(`http://${API_URL}/user/recent_notebooks`,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            withCredentials: true,
                        }
                    )
                    if (response2.status === 200) {
                        setRecentData(response2.data)
                        setLoading(false)
                    }
                }
                catch (err) {
                    console.log(err)
                    toast("Cannot fetch data!", { type: "error" })
                }
            }
        }
        fetchData();
    }, [])

    const handleDeleteNotebook = async () => {
        setLoading(true)
        const notebookId = deleteItem.notebookId
        if (localStorage.getItem('token')) {
            try {
                const response = await axios.delete(`http://${API_URL}/notebook/notebook/${notebookId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true
                });
                if (response.status === 200) {
                    setData(data.filter(notebook => notebook.notebook_id !== notebookId))
                    setRecentData(recentData.filter(notebook => notebook.notebook_id !== notebookId))
                    setDeleteItem(null);
                    toast("Notebook deleted", { type: "success" })
                }
                else {
                    console.log(response)
                    toast("Cannot delete notebook", { type: "error" })
                }
            }
            catch (err) {
                console.log(err)
                toast("Cannot delete notebook", { type: "error" })
            }
        }
        setLoading(false)
    }

    return (
        <div className="notebook-management-page">
            {isLoading ? <LoadingPage /> : null}
            <HeaderNoteManagementPage setLoading={setLoading} />
            <div className="notebook-management-content">
                <h2>Recent Notebooks</h2>
                <GridNoteList noteList={recentData} setDeleteItem={setDeleteItem} />
                <div className="all-notebook-title">
                    <h2>All Notebooks</h2>
                    <input
                        type="text"
                        placeholder="Search notebooks..."
                        value={searchKeyword}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                setSearchKeyword("")
                            }
                            else
                                setSearchKeyword(e.target.value)
                        }}
                    />
                </div>
                <GridNoteList noteList={data} searchKeyword={searchKeyword} setDeleteItem={setDeleteItem} />
            </div>
            {
                deleteItem ? (
                    <div className="notebook-modal">
                        <div className="modal-content"
                            style={{ width: 350, height: 150 }}>
                            <div className="delete-modal">
                                <p>Delete <i>{deleteItem.title}</i> ?</p>
                                <div>
                                    <button onClick={handleDeleteNotebook}>
                                        Delete
                                    </button>
                                    <div style={{ width: 20 }}></div>
                                    <button onClick={() => setDeleteItem(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default NotebookManagementPage;