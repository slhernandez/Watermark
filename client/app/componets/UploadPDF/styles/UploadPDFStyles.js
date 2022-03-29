import styled from 'styled-components';

const UploadPDFStyles = styled.div`
  .upload-container {
    width: 900px;
    margin: 6em auto 6em auto
  }

  .fieldset {
    position: relative;
    border: 1px solid #ccc;
    padding: 1em 2em 1.5em 2em;
    border-radius: 6px;
    margin-top: 3em;
  }

  .fieldset h1 {
    position: absolute;
    top: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    margin: -9px 0 0; /* half of font-size */
    background: #f5f7f9;
    padding: 0 3px;
  }

  .upload-title {
    font-size: 1.6em;
    font-weight: 600;
    text-align: center;
  }

  .upload-form {
    padding: 1em;
    box-sizing: border-box;
  }

  .upload-controls {
    width: 350px;
    margin: 0 auto;
  }

  .upload-btn {
    margin-top: 1em;
    width: 100%;
    background: #ff2e00;
    color: #FFF;
    font-weight: 600;
    border: 1px solid #ff2e00;
  }

  .upload-btn.pulse {
    animation: shadow-pulse 1s infinite ease-in-out;
  }

  @keyframes shadow-pulse {
    0% {
      box-shadow: 0 0 8px 3px rgba(89, 172, 245, 0.2);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 8px 3px rgba(89, 172, 245, 0.9);
      transform: scale(1);
    }
    100% {
      box-shadow: 0 0 8px 3px rgba(89, 172, 245, 0.2);
      transform: scale(1);
    }
  }

  .upload-btn:disabled {
    opacity: 50%;
    animation: none;
    box-shadow: none;
  }

  .file-upload-label {
    font-weight: 600;
    margin-right: 1em;
  }

  input[type=file]::file-selector-button {
    border: 1px solid #288CF5;
    padding: .5em 1em;
    border-radius: .2em;
    background-color: #288CF5;
    transition: 1s;
    font-size: 16px;
    color: white;
  }

  input[type=file]::file-selector-button:hover {
    background-color: #489df7;
    border: 1px solid #489df7;
  }

  .upload-error-msg {
    padding: 0.5em 0 0.5em 0;
    font-weight: 600;
    color: red;
    font-size: 14px;
    text-align: center;
  }

  .upload-progress-msg {
    padding: 1em;
    font-weight: 600;
    color: #454545;
  }

  .upload-success {
    padding: 1em;
    font-weight: 600;
    color: #64C255;
  }

`;

export default UploadPDFStyles;
