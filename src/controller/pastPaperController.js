const PastPaper = require('../models/PastPaper');
const fsPromises = require('fs').promises;

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

    let imagesArray = []

    if (req.files) {
        req.files.forEach(element => {
            imagePath = element?.path
            imagesArray?.push(imagePath)
        })
    }

    const newPastPaper = new PastPaper({
        name: body?.name,
        Images: imagesArray
    });

    try {
        await newPastPaper.save();

        return res.status(201).json({ message: `${newPastPaper?.name} has been added successfully` })
    }
    catch (error) {
        res.status(error?.status || 500).json({ message: error?.message || error });
    }
}

const updatePastPaper = async (req, res) => {

}

const deletePastPaper = async (req, res) => {
    try {
        res.pastPaper.Images.forEach(async (element) => {
            await fsPromises.unlink(element);
        });
        await res.pastPaper.remove();
        return res.status(204).json({ message: "Product deleted" });
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