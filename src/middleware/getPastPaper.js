const PastPaper = require('../models/PastPaper');

const getPastPaper = async (req, res, next) => {
    const {
        params: { pastPaperId },
    } = req;

    let pastPaper;

    if (!pastPaperId) {
        res.status(400).json({"message": "The past paper id name can not be empty" });
    }

    try {
        pastPaper = await PastPaper.findOne({name: pastPaperId});
        if (pastPaper === null) return res.status(404).json({ message: "This past paper is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({"message": error?.message || error  });
    }

    res.pastPaper = pastPaper;
    next()
}

module.exports = getPastPaper;