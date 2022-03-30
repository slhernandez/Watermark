import axios from 'axios';

const API_ENDPOINT = "http://localhost:3000/"

/*
 * API POST to upload a single PDF file using axios.
 */
export const uploadPDF = async (data) => {
  const baseUrl = API_ENDPOINT;
  const url = baseUrl + "pdf";
  const endpoint = window.encodeURI(url);

  try {
    return await axios.post(endpoint, data);
  } catch (error) {
    console.error(
      `Error encoutered while uploading PDF file = ${error}`
    );
    throw error;
  }
}

/*
 * API request to a list of PDF files that have been uploaded.
 */
export const getPDFItems = async () => {
  const baseUrl = API_ENDPOINT;
  const url = baseUrl + "pdf";
  const endpoint = window.encodeURI(url);

  try {
    return await axios.get(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    console.error(
      `Error encoutered while getting PDF lists = ${error}`
    );
    throw error;
  }
}