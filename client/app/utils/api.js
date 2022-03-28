import axios from 'axios';

const API_ENDPOINT = "http://localhost:3000/"

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