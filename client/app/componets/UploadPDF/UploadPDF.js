import React, { useEffect, useState } from 'react';
import UploadPDFStyles from './styles/UploadPDFStyles';
import PDFList from './PDFList';
import * as API from '../../utils/api';

function UploadPDF() {

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [updatePDFList, setUpdatePDFList] = useState(false);
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(true);

  const resetUIState = () => {
    setSuccessMsg("");
    setIsError(false);
    setErrorMsg("");
    setUpdatePDFList(false);
  };

  const captureFile = e => {
    const file = e.target.files[0];
    setFile(file);
    setUploadBtnDisabled(false);

    // Reset UI state before uploading PDF file.
    resetUIState();
  };

  /*
   * ASYNC/AWAIT request to upload single PDF file.
   */
  const upload = async(data) => {

    // Reset UI state before uploading PDF file.
    resetUIState();

    try {
      setIsLoading(true);
      const response = await API.uploadPDF(data);
      if (response.status === 200) {
        setIsLoading(false);
        setSuccessMsg("Upload was successful.");
        setUpdatePDFList(true);
        setUploadBtnDisabled(true);
      } else {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(`Upload was unsuccessful. Status Code: ${response.status}`);
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

  /*
   * Send onClick event that trigger PDF file upload.
   */
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
          <section className="fieldset">
            <h1>Upload PDF File</h1>
            <form className="upload-form" action="#">
              <input 
                type="file" 
                id="file" 
                accept='.pdf' 
                className="custom-file-input" 
                onChange={captureFile} 
              />
            </form>
            <button 
              className="btn upload-btn pulse" 
              onClick={send}
              disabled={uploadBtnDisabled}
            >
              Upload PDF
            </button>
          </section>
          {isLoading && <p className="upload-progress-msg">Uploading PDF file...</p>}
          {successMsg && <p className="upload-success">{successMsg}</p>}
          {isError && 
            <div className="upload-error">
              <p className="upload-error-msg">Encountered an error during PDF upload.</p>
              <p className="upload-error-msg">{errorMsg}</p>
            </div>
          }
        </div>
        <PDFList updatePDFList={updatePDFList} />
      </div>
    </UploadPDFStyles>
  )
}

export default UploadPDF;