import React, { useEffect, useState } from 'react';
import PDFListStyles from './styles/PDFListStyles';
import PDFTable from './PDFTable';
import * as API from '../../utils/api';

function PDFList(props) {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getPDFList = async() => {
    try {
      const response = await API.getPDFItems();
      console.log('response...', response);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error(
        `Encountered error while uploading PDF file. Error ${error.message}`
      )
      //setIsLoading(false);
      //setIsError(true);
      //setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    getPDFList()
  }, [props.updatePDFList]);

  useEffect(() => {
    getPDFList()
  }, []);


  return(
    <PDFListStyles>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {errorMsg}</p>
      ) : (
        <div className="pdf-list-container">
          {data && <PDFTable data={data} />}
        </div>
      )}
    </PDFListStyles>
  )
}

export default PDFList;