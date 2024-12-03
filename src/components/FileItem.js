import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

function FileItem(props) {
    const itemRef = useRef();
    const [isPicked, setPicked] = useState(false);
    useEffect(() => {
        if (props.isCheckedAll) {
            setPicked(true);
        }
        else {
            setPicked(false);
        }
    }, [props.isCheckedAll])

    const handleCheckboxChanged = () => {
        if (isPicked) {
            setPicked(false);
            props.removeFileFunc(props.file.file_id);
        }
        else {
            setPicked(true);
            props.addFileFunc(props.file.file_id);
        }
    }

    return (
        <div className={isPicked ? "file-item picked" : "file-item"} onClick={handleCheckboxChanged}
            ref={itemRef}>
            <div className="checkbox" >
                {isPicked ?
                    <p className="checkbox-checked" /> : null
                }
            </div>
            <p data-tooltip-content={props.file.file_name}
                data-tooltip-id="file-tooltip">{props.file.file_name}</p>
            <Tooltip id="file-tooltip"
                place="right"
                style={{ zIndex: 5 }} />
        </div>
    );
}

export default FileItem