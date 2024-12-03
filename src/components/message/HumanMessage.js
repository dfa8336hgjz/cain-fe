import React from "react";
import ReactMarkdown from "react-markdown";

function HumanMessage(props) {
    return (
        <div className="human-message">
            <ReactMarkdown>{props.message}</ReactMarkdown>
        </div>
    )
}

export default HumanMessage