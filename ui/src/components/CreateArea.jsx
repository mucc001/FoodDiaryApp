import React, { useState }from "react";
import axios from 'axios';

function CreateArea(props) {
  const [record, setRecord] = useState(
      {
          title: "",
          content: ""
      }
  );

  function handleChange(event) {
    const {name, value} = event.target;
    setRecord(preveRecord => {
        return {
            ...preveRecord,
            [name]: value
        }
    });
  }

  function submitRecord(event) {
    let recordJson = JSON.stringify(record);
    axios.post('http://localhost:8000/records', recordJson, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    props.onAdd(record);
    setRecord({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={record.title}
          placeholder="Date"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={record.content}
          placeholder="Take a note on what you ate..."
          rows="3"
        />
        <button onClick={submitRecord}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
