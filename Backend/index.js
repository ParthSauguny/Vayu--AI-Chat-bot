const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = 5000;
const {GoogleGenerativeAI} = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

app.post("/gemini" , async(req , res) => {
    const {ques , chatHistory} = req.body;
    console.log(ques);
    console.log(chatHistory);
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});

    const chat = model.startChat({
        history: chatHistory
    })
    const result = await chat.sendMessage(ques)
    const resp = await result.response
    const textAns = resp.text();
    res.send(textAns);
});

app.listen(PORT , () => {console.log("server started at port" , PORT)});