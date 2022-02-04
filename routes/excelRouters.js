const express = require('express');
const excelController = require('./../controllers/excelController');
const router = express.Router();



router.route('/:id')
    .post(excelController.createZoomRegistrants);

module.exports = router;