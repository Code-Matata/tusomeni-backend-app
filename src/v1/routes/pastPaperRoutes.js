const express = require("express");
const multer = require("multer");
const router = express.Router();
const pastPaperController = require('../../controller/pastPaperController');
const getPastPaper = require('../../middleware/getPastPaper');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Math.floor(
        100000 + Math.random() * 900000
      ).toString()}.${file.originalname.split(".").pop()}`
    );
  },
});
const upload = multer({ storage: storage });

router.get('/', pastPaperController.fetchAllPapers);
router.get('/:pastPaperId', getPastPaper, pastPaperController.fetchSinglePastPaper);
router.post('/', upload.array("images", 10), pastPaperController.addPastPaper);
router.patch('/:pastPaperId', getPastPaper, pastPaperController.updatePastPaper);
router.delete('/:pastPaperId', getPastPaper, pastPaperController.deletePastPaper);

module.exports = router;