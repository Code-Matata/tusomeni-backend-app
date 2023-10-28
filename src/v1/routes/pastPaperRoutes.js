const express = require("express");
const router = express.Router();
const pastPaperController = require('../../controller/pastPaperController');
const chatGPTPrompt = require('../../controller/chatGPTPrompt');
const getPastPaper = require('../../middleware/getPastPaper');
const { uploadImages } = require('../../middleware/imageUpload');
const mpesaTest = require("../../controller/mpesaTest");

router.get('/', pastPaperController.fetchAllPapers);
router.get('/:pastPaperId', getPastPaper, pastPaperController.fetchSinglePastPaper);
router.post("/", uploadImages.array("images", 10), pastPaperController.addPastPaper);
router.patch("/:pastPaperId", getPastPaper, pastPaperController.updatePastPaper);
router.delete("/:pastPaperId", getPastPaper, pastPaperController.deletePastPaper);
router.post("/gpt", chatGPTPrompt.getAnswers);
router.post("/mpesaCB", mpesaTest.mpesaCallback)

module.exports = router;