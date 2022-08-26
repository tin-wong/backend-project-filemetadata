var express = require('express');
var cors = require('cors');
require('dotenv').config();
// Use multer to handle file uploading
const multer  = require('multer')
// Set the file upload destination to the ./uploads folder
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Allows file upload at route /api/fileanalyse. Then responds with name, type and size in JSON.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size})
  console.log(req.file);
  next();
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});