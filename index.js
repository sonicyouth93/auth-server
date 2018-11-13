const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/auth',
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// server setup
http.createServer(app);
const port = process.env.PORT || 3000;
app.listen(port);
console.log('server running at', port);
