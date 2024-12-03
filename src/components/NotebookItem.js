import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Trash } from '../assets/icons/trash.svg'
import { formatDate } from "../services/timeSupport";
import { Tooltip } from "react-tooltip";

const NotebookItem = ({ title, createdAt, notebookId, setDeleteItem }) => {
    const handleDelete = async () => {
        setDeleteItem({
            notebookId: notebookId,
            title: title,
        })
    }

    return (
        <div className="notebook-item">
            <div onClick={handleDelete}>
                <Trash width={25} height={25} />
            </div>
            <a className="notebook-item-title"
                href={`/notebook/${notebookId}`}
                data-tooltip-content={title}
                data-tooltip-id="notebook-item-tooltip"
                data-tooltip-place="top">{title}</a>
            <Tooltip id="notebook-item-tooltip"
                arrowColor="transparent"
                style={{
                    height: '20px',
                }} />
            <div className="notebook-item-date">{formatDate(createdAt)}</div>
        </div>
    );
};

export default NotebookItem;
