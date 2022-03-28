import React from 'react';
import ReactDOM from 'react-dom';
import UploadPDF from './componets/UploadPDF/UploadPDF';
import './index.css';


class App extends React.Component {
  render() {
    return (
      <UploadPDF />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)