// orc-service/index.js
import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import { parseReceiptWithOpenAI } from './openaiParser.js';

const app = express();
app.use(express.json({ limit: '15mb' }));

// Azure OCR config
const AZURE_ENDPOINT = "";
const AZURE_KEY = "";
const MONGO_URL = ""

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const orderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:"users"},
  name: String,
  date: String,
  items: [
    {
      name: String,
      price: Number
    }
  ],
  total: Number,
  tip: Number,
  createdAt: {type: Date, default: Date.now}
});

const UserModel = mongoose.model("users", userSchema)
const OrderModel = mongoose.model("orders", orderSchema)

app.get('/users', async(req, res)=>{
  const userData = await UserModel.find();
  res.json(userData);
})

// Create a new order
app.post("/orders", async (req, res) => {
  try {
    const { userId, name, date, items, total, tip } = req.body;

    // Make sure user exists
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newOrder = new OrderModel({
      user: userId,
      name,
      date,
      items,
      total,
      tip,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for a specific user
app.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ user: userId }).populate("user", "email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order by id
app.get("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Hello")
    const order = await OrderModel.findById(id); // mongoose example
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

app.post('/parse-reciept', async (req, res) => {
  try {
    const { base64Image } = req.body;
    if (!base64Image) {
      return res.status(400).json({ error: 'Missing base64Image' });
    }

    // Step 1: Send base64 image to Azure OCR
    const imageBuffer = Buffer.from(
      base64Image.replace(/^data:image\/\w+;base64,/, ''), 
      'base64'
    );

    const analyzeResponse = await axios.post(
      `${AZURE_ENDPOINT}vision/v3.2/read/analyze`,
      imageBuffer,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Content-Type': 'application/octet-stream'
        }
      }
    );

    const operationLocation = analyzeResponse.headers['operation-location'];

    // Step 2: Poll Azure for results
    let ocrResult;
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const resultResponse = await axios.get(operationLocation, {
        headers: { 'Ocp-Apim-Subscription-Key': AZURE_KEY }
      });
      if (resultResponse.data.status === 'succeeded') {
        ocrResult = resultResponse.data.analyzeResult.readResults;
        break;
      } else if (resultResponse.data.status === 'failed') {
        throw new Error('Azure OCR failed');
      }
    }

    // Combine all text lines
    const extractedText = ocrResult
      .map(page => page.lines.map(line => line.text).join('\n'))
      .join('\n');

    // Step 3: Send to LLaMA
    const llmResponse = await axios.post('http://llama:5000/parse-text', {
      receipt_text: extractedText
    });

    res.json(llmResponse.data.response);

    // Call the OpenAI parser function
    const jsonResponse = await parseReceiptWithOpenAI(extractedText);

    res.json(jsonResponse);

  } catch (err) {
    res.status(500).json({ error: 'Processing failed', details: err.message });
  }
});


mongoose.connect(MONGO_URL).then(()=>{
  console.log("Database is connected suceessfully")
  app.listen(3000, "0.0.0.0", () => console.log("Server running on port 3000"));
}).catch((error)=>console.log(error));

