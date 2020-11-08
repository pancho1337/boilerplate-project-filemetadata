'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  console.log("upfile", req.file)
  let resObj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.json(resObj);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

// {
//   "name": "images.jpg",
//   "type": "image/jpeg",
//   "size": 6756
//   }

// upfile {
//   fieldname: 'upfile',
//   originalname: 'images.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads/',
//   filename: '6c8230d6c48e91ef26577db9999feb6e',
//   path: 'uploads/6c8230d6c48e91ef26577db9999feb6e',
//   size: 6756
// }