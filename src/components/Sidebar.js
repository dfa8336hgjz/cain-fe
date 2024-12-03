import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SidebarIcon } from '../assets/icons/sidebarExpand.svg'
import { ReactComponent as BackIcon } from '../assets/icons/backArrow.svg'
import logo from '../assets/logo.png'
import FileItem from "./FileItem";

function SideBar(props) {
    const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
    const navigate = useNavigate();

    return (
        <div className={sidebarClass}>
            <div className="sidebar-header">
                <SidebarIcon onClick={props.toggleSidebar} className="sidebar-toggle" />
                {props.isOpen ?
                    <>
                        <img src={logo} alt="logo" className='logo' />
                        <h1 id="app-name">CAIN</h1>
                    </> : null}
            </div>
            <div className="sidebar-content">
                {props.isOpen ?
                    <div style={{ width: "100%", height: "100%" }}>
                        <button className="add-file-button"
                            onClick={() => props.openModalFunc(true)}>
                            <p>+</p>
                            <p>
                                Add file
                            </p>
                        </button>
                        <div className={props.isCheckedAll ? "file-item picked" : "file-item"}
                            onClick={() => props.setCheckedAll(!props.isCheckedAll)}>
                            <div className="checkbox">
                                {props.isCheckedAll ?
                                    <p className="checkbox-checked" /> : null
                                }
                            </div>
                            <p>All</p>
                        </div>

                        <div className="file-list">
                            {props.listFile.map((file, index) => (
                                <FileItem key={index}
                                    file={file}
                                    isCheckedAll={props.isCheckedAll}
                                    addFileFunc={props.addFileFunc}
                                    removeFileFunc={props.removeFileFunc} />
                            ))}
                        </div>
                    </div>
                    : null}
            </div>
            <button className="sidebar-footer" onClick={() => navigate('/notebooks')}>
                <BackIcon className="back-icon" />
                {
                    props.isOpen ? "Back to Main Page" : null
                }
            </button>
        </div>
    );
};
export default SideBar;