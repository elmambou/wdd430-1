var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// Get routes
const index = require('./server/routes/app');
const productRoutes = require('./server/routes/products');

// Connect to database
mongoose.connect('mongodb://localhost:27017/shopping',
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log('Connection failed: ' + err);
    }
    else {
      console.log('Connected to database!');
    }
  }
);

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(logger('dev'));

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Specify root directory
app.use(express.static(path.join(__dirname, 'dist/final-project')));

// Map URLs to routes
app.use('/', index);
app.use('/api/products', productRoutes);

// Handle invalid URLs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/final-project/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
