const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors())
app.use(morgan('dev'))

// Middlewares
app.use(express.json());


// Connect to MongoDB
const ConnectionDB = async () => {
    try {
        const Connect = await mongoose.connect(MONGODB_URI)
        console.log(`Mongo Connected : ${Connect.connection.host}`)
    } catch (error) {
        console.log(error)
        // process.exit(1)
    }
}
ConnectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})

// Routes
const Routes = require('./routes/index')
app.use('/api/v1', Routes);
