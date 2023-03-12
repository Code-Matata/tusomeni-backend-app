const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const getAnswers = async (req, res) => {
  const { question } = req.body
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: question }],
  })
  return res.status(201).json({ message: completion.data.choices[0].message })
}

module.exports = {
  getAnswers,
}
