const express = require('express')
const cors =require('cors')
require('dotenv').config()
const {GoogleGenerativeAI} = require('@google/generative-ai')
const app = express()
const port = 5000 || process.env.PORT
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
app.use(cors());
app.use(express.json());
app.post('/roast', async (req, res) => {
    const {code} = req.body;
    if(!code) {
        return res.status(400).json({error: 'No code provided'});
    }
    try {
        const prompt = `You are a rude senior developer. Roast this code: ${code}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    } catch (error) {
        console.error('Error generating roast:', error);
        res.status(500).json({error: 'Internal server error'});
    }
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
