const express = require('express');
const router = express.Router();
const pdf = require('../services/pdf');
const path = require('path');
const multer = require("multer");
const watermark = require('image-watermark');

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

/* POST PDF to database */
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    console.log('req.file...', req.file);
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

router.get('/', async function(req, res, next) {
  try {
    res.json(await pdf.getList(req.query));
  } catch (err) {
    console.error(`Error while getting pdf file list`, err.message);
    next(err);
  }
});

// PDF get single PDF asset.
router.get('/:filename', async (req, res, next) => {
  try {
    const pdfInfo = await pdf.getPDF(req.params);
    console.log('pdfInfo...', pdfInfo);
    const dirname = path.resolve();
    const fullFilePath = path.join(dirname, pdfInfo.result[0].filepath);
    return res.type(pdfInfo.result[0].mimetype).sendFile(fullFilePath);
  } catch (err) {
    console.error(`Error while retrieving pdf file `, err.message);
    next(err);
  }
});

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