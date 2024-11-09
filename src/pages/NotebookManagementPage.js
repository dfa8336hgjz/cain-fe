import { useEffect, useState } from "react";
import GridNoteList from "../components/GridNotebookList";
import HeaderNoteManagementPage from "../components/headers/HeaderNoteManagementPage";
import '../styles/notebookManagementPage.css'
import API_URL from "../services/config";
import axios from "axios";

const NotebookManagementPage = () => {
    const [searchKeyword, setSearchKeyword] = useState('')

    const [data, setData] = useState([])

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
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        fetchData();
    }, [])

    return (
        <div className="notebook-management-page">
            <HeaderNoteManagementPage />
            <div className="notebook-management-content">
                <h2>Recent Notebooks</h2>
                <GridNoteList noteList={data} />
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
                <GridNoteList noteList={data} searchKeyword={searchKeyword} />
            </div>
        </div>
    );
}

export default NotebookManagementPage;