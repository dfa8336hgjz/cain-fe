import React from "react";
import ReactMarkdown from "react-markdown";

function BotMessage(props) {
    return (
        <div className="bot-message">
            <ReactMarkdown>{props.message}</ReactMarkdown>
        </div>
    )
}

export default BotMessage