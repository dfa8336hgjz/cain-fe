import { useState } from "react";
import GridNoteList from "../components/GridNotebookList";
import HeaderNoteManagementPage from "../components/headers/HeaderNoteManagementPage";
import '../styles/notebookManagementPage.css'

const NotebookManagementPage = () => {
    const [searchKeyword, setSearchKeyword] = useState('')

    const data = [
        {
            title: 'Note 1fsghhjuyjtukyi',
            createdAt: '2022-01-01',
            notebookId: '1'

        },
        {
            title: 'Note 2',
            createdAt: '2022-01-02',
            notebookId: '2'
        },
        {
            title: 'Note 3',
            createdAt: '2022-01-03',
            notebookId: '2'
        },
        {
            title: 'Note 4',
            createdAt: '2022-01-04',
            notebookId: '2'
        },
        {
            title: 'Note 5',
            createdAt: '2022-01-05',
            notebookId: '2'
        }]

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
                        }
                        }
                    />
                </div>
                <GridNoteList noteList={data} searchKeyword={searchKeyword} />
            </div>
        </div>
    );
}

export default NotebookManagementPage;