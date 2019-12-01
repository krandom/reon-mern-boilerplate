const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require('./config/db')
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:9090'],
  credentials: true
}));

// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/admin/auth', require('./routes/api/admin/auth'));
app.use('/api/admin/users', require('./routes/api/admin/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`); });