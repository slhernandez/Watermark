const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/*
 * create: Service to add a single PDF to storage.
 */
async function create(pdf) {
  const pdfWatermarkPath = `pdfs_watermark/watermark_${pdf.filename}`;
  const result = await db.query(
    'INSERT INTO pdf_files(filename, originalfilename, filepath, mimetype, size, watermarkfilepath) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [pdf.filename, pdf.originalname, pdf.path, pdf.mimetype, pdf.size, pdfWatermarkPath]
  );

  let message = 'Error in creating pdf';
  if (result.length) {
    message = 'PDF created successfully';
  }

  return {message};
}

/*
 * getList: Retrieve all PDF files from db.
 * TODO: Add support for pagination/paging
 */
async function getList() {
  const rows  = await db.query(
    'SELECT * FROM pdf_files'
  );
  const data = helper.emptyOrRows(rows);
  return {data};
}

/*
 * getPDF: Service that helps serve raw PDF files.
 */
async function getPDF(pdf) {
  const result = await db.query(
    'SELECT * FROM pdf_files WHERE filename = $1',
    [pdf.filename]
  );

  return {result}
}

module.exports = {
  create,
  getPDF,
  getList
}