
const mpesaCallback = async (req, res) => {
  return res.status(201).json({ data: res.body })
}

module.exports = {
    mpesaCallback,
}