import React, { useEffect, useState } from 'react';
import UploadPDFStyles from './styles/UploadPDFStyles';
import axios from 'axios';

function UploadPDF() {

  const [name, setName] = useState();
  const [file, setFile] = useState();

  const send = e => {
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    
    axios.post(
      'http://localhost:3000/pdf',
      data
    ).then( res => {
      console.log(res);
    }).catch(err => {
      console.error(err.message);
    });
  }

  return(
    <UploadPDFStyles>
      <form className="upload-container" action="#">
        <div className="upload-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={e => {
            const {value} = e.target;
            setName(value);
          }} />
        </div>
        <div className="upload-form">
          <label htmlFor="file">File</label>
          <input type="file" id="file" accept='.pdf' onChange={e => {
            const file = e.target.files[0];
            setFile(file);
          }} />
        </div>
      </form>
      <button onClick={send}>Send</button>
    </UploadPDFStyles>
  )
}

export default UploadPDF;