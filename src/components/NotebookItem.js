import React, { useEffect, useRef, useState } from "react";
import threedot from "../assets/three_dot.png";
import { formatDate } from "../services/timeSupport";

const NotebookItem = ({ title, createdAt, notebookId }) => {
    const [isPopup, setPopup] = useState(false);
    const modalRef = useRef();


    const closeModal = () => {
        setPopup(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    }

    useEffect(() => {
        if (isPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isPopup]);

    return (
        <button className="notebook-item">
            <div onClick={() => setPopup((prev) => !prev)}>
                <img src={threedot} alt="Options" />
            </div>
            <a className="notebook-item-title" href={`/notebook/${notebookId}`}>{title}</a>
            <div className="notebook-item-date">{formatDate(createdAt)}</div>
            {isPopup ? (
                <div className="notebook-item-sub-menu" ref={modalRef}>
                    <button>Delete</button>
                    <button>Rename</button>
                </div>
            ) : null}
        </button>
    );
};

export default NotebookItem;
