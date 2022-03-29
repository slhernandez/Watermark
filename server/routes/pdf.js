const express = require('express');
const router = express.Router();
const pdf = require('../services/pdf');
const path = require('path');
const multer = require("multer");
const watermark = require('image-watermark');

/*
 * Utilize node.js middleware (Multer) for handling mulitpart/form-data,
 * that is used for uploading files.
 * 
 * upload: config setup for single file upload.
 */
const upload = multer({
  storage: multer.diskStorage(
    {
      destination: function (req, file, cb) {
        cb(null, 'pdfs/');
      },
      filename: function (req, file, cb) {
        cb(
          null,
          new Date().valueOf() + '_' + file.originalname
        );
      }
    }
  )
});

/* 
 * POST a single PDF to storage and embed the watermark to file and record
 * the file meta information to db.
 * 
 * Two destinations are set for PDF files file storage
 *  - pdfs (folder)
 *  - pdfs_watermark (folder)
 */
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    // watermark the PDF file.
    const options = {
      'text': 'MDisrupt Watermark',
      'color': 'rgb(154, 50, 46)',
      'dstPath': `pdfs_watermark/watermark_${req.file.filename}`
    }
    watermark.embedWatermarkWithCb(req.file.path, options, (err) => {
      if (!err) {
        console.log('Successfully embeded watermark');
      } else {
        console.error('Watermark error: ', err.message);
      }
    });
    res.json(await pdf.create(req.file));
  } catch (err) {
    console.error(`Error while posting pdf file `, err.message);
    next(err);
  }
});

/* 
 * GET request to retrieve listing of PDF files that have already
 * been uploaded/stored.
 */
router.get('/', async function(req, res, next) {
  try {
    res.json(await pdf.getList(req.query));
  } catch (err) {
    console.error(`Error while getting pdf file list`, err.message);
    next(err);
  }
});

/*
 * Server RAW PDF asset.
 */
router.get('/:filename', async (req, res, next) => {
  try {
    const pdfInfo = await pdf.getPDF(req.params);
    const dirname = path.resolve();
    const fullFilePath = path.join(dirname, pdfInfo.result[0].filepath);
    return res.type(pdfInfo.result[0].mimetype).sendFile(fullFilePath);
  } catch (err) {
    console.error(`Error while retrieving pdf file `, err.message);
    next(err);
  }
});

/* 
 * Server RAW Watermark PDF asset.
 */
router.get('/watermark/:filename', async (req, res, next) => {
  try {
    const pdfInfo = await pdf.getPDF(req.params);
    const dirname = path.resolve();
    const fullFilePath = path.join(dirname, pdfInfo.result[0].watermarkfilepath);
    return res.type(pdfInfo.result[0].mimetype).sendFile(fullFilePath);
  } catch (err) {
    console.error(`Error while retrieving watermark pdf file `, err.message);
    next(err);
  }
});

module.exports = router;