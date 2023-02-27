const { uploadToCloudinary } = require('../middleware/imageUpload');
const PastPaper = require('../models/PastPaper');

const fetchAllPapers = async (req, res) => {
    try {
        const allPastPapers = await PastPaper.find()
        res.status(200).json(allPastPapers);
    }
    catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const fetchSinglePastPaper = async (req, res) => {
    try {
        return res.status(200).json(res.pastPaper);
    }
    catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const addPastPaper = async (req, res) => {
    const { body } = req;

    let imagesArray = [];

    for (let i = 0; i < req.files.length; i++) {
        try {
            const res = await uploadToCloudinary(req.files[i].path);
            imagesArray.push(res.url);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    const newPastPaper = new PastPaper({
        name: body?.name,
        images: imagesArray,
        year: body?.year,
        category: body?.category
    });

    try {
        await newPastPaper.save();
        return res.status(201).json({ message: `${newPastPaper?.name} has been added successfully` })
    }
    catch (error) {
        res.status(500).json({ message: error?.message || error });
    }
}

const updatePastPaper = async (req, res) => {

}

const deletePastPaper = async (req, res) => {
    if (res.pastPaper.images.length !== 0) {
        try {
            res.pastPaper.images.forEach(async (element) => {
                await fsPromises.unlink(element);
            });
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error?.message || error });
        }
    }
    try {
        await res.pastPaper.remove();
        return res.status(204).json({ message: "Past paper deleted" });
    }
    catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

module.exports = {
    fetchAllPapers,
    fetchSinglePastPaper,
    addPastPaper,
    updatePastPaper,
    deletePastPaper
}