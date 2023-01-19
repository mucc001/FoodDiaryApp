import React from "react";

function Record(props) {
    function handleClick() {
        props.onDelete(props.id);
    }   


    return (
        <div className="record">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleClick}>DELETE</button>
        </div>
    );
}

export default Record;
