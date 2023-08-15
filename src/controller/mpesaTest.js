
const mpesaCallback = async (req, res) => {
    console.log(req.body, "mpesa callback")
  return res.status(201).json({ data: req.body })
}

module.exports = {
    mpesaCallback,
}