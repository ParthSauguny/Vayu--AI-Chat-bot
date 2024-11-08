const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = 5000;
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

app.post("/gemini", async (req, res) => {
    const { ques } = req.body;

    try {
        const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Start chat with an empty history array to test functionality
        const chatSession = await model.startChat({
            history: []
        });

        // Send the user's question
        const result = await chatSession.sendMessage(ques);

        const textAns = await result.response.text();
        
        res.send(textAns);
    } catch (error) {
        console.error("Error during chat processing:", error);
        res.status(500).send("Something went wrong with the AI response generation.");
    }
});

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
});
