import React, { useEffect, useRef, useState } from "react";
import threedot from "../assets/three_dot.png";
import { formatDate } from "../services/timeSupport";

const NotebookItem = ({ title, createdAt, notebookId }) => {
    const [isPopup, setPopup] = useState(false);
    const modalRef = useRef();
    const buttonRef = useRef();

    const closeModal = () => {
        setPopup(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)
            && buttonRef.current && !buttonRef.current.contains(event.target)) {
            closeModal();
        }
    }

    const handleDelete = async () => {

    }

    const handleRename = async () => {

    }

    useEffect(() => {
        if (isPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isPopup]);

    return (
        <button className="notebook-item">
            <div onClick={() => setPopup((prev) => !prev)} ref={buttonRef}>
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
