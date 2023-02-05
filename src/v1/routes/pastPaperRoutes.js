const express = require("express");
const router = express.Router();
const pastPaperController = require('../../controller/pastPaperController');
const getPastPaper = require('../../middleware/getPastPaper');
const uploadImages = require('../../middleware/imageUpload');

router.get('/', pastPaperController.fetchAllPapers);
router.get('/:pastPaperId', getPastPaper, pastPaperController.fetchSinglePastPaper);
router.post('/', uploadImages.array('image'), pastPaperController.addPastPaper);
router.patch('/:pastPaperId', getPastPaper, uploadImages.array('image'), pastPaperController.updatePastPaper);
router.delete('/:pastPaperId', getPastPaper, pastPaperController.deletePastPaper);

module.exports = router;