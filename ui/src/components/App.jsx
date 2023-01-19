import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Record from "./Record";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {
  const [records, setRecords] = useState([]);
  
  function addRecord(newRecord) {
    setRecords(prevRecords => {
      return [...prevRecords, newRecord];
    });
  }
  
  function deleteRecord(id) {
    axios.delete(`http://localhost:8000/records/${id}`)
    .then(response => {
      setRecords(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  useEffect(() => {
    axios.get("http://localhost:8000/records")
      .then(response => {setRecords(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addRecord} />
      {records.map((recordItem, index) => {
        return (
          <Record
            key={index}
            id={index}
            title={recordItem.title}
            content={recordItem.content}
            onDelete={deleteRecord}
          />
        );
      })}
      <Footer />
    </div>
  );
}
  export default App;