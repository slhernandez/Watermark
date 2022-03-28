import React, { useEffect, useState } from 'react';
import UploadPDFStyles from './styles/UploadPDFStyles';
import * as API from '../../utils/api';

function UploadPDF() {

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const resetUIState = () => {
    setSuccessMsg("");
    setIsError(false);
    setErrorMsg("");
  };

  const captureFile = e => {

    const file = e.target.files[0];
    setFile(file);

    // Reset UI state before uploading PDF file.
    resetUIState();
  };

  const upload = async(data) => {

    // Reset UI state before uploading PDF file.
    resetUIState();

    try {
      setIsLoading(true);
      const response = await API.uploadPDF(data);
      console.log('UploadPDF...response...', response);
      if (response.status === 200) {
        setIsLoading(false);
        setSuccessMsg("Upload was successful.");
      } else {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg("Upload was unsuccessful.")
      }
    } catch (error) {
      console.error(
        `Encountered error while uploading PDF file. Error ${error.message}`
      )
      setIsLoading(false);
      setIsError(true);
      setErrorMsg(error.message);
    }
  };

  const send = e => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      upload(data);
    } else {
      setIsError(true);
      setErrorMsg("Did not find PDF file to upload.")
    }
  }

  return(
    <UploadPDFStyles>
      <div className="upload-container">
        <h1 className="upload-title">PDF Watermarking Tool</h1>
        <div className="upload-controls">
          <form className="upload-form" action="#">
            <label htmlFor="file" className="file-upload-label">Upload PDF file</label>
            <input 
              type="file" 
              id="file" 
              accept='.pdf' 
              className="custom-file-input" 
              onChange={captureFile} 
            />
          </form>
          <button className="btn upload-btn" onClick={send}>Upload PDF</button>
          {isLoading && <p className="upload-progress-msg">Uploading PDF file...</p>}
          {successMsg && <p className="upload-success">{successMsg}</p>}
          {isError && 
            <div className="upload-error">
              <p className="upload-error-msg">Encountered an error during PDF upload.</p>
              <p className="upload-error-msg">{errorMsg}</p>
            </div>
          }
        </div>
      </div>
    </UploadPDFStyles>
  )
}

export default UploadPDF;