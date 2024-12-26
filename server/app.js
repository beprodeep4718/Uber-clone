require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB(process.env.MONGO_URI);