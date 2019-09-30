const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadsConfig = require('./config/upload');
const path = require('path');

const app = express();

const { User, Image } = require('./app/models');

app.use(bodyParser.urlencoded({ extended: false }));
const upload = multer(uploadsConfig);
app.use(bodyParser.json());

app.use('/files', express.static(path.resolve(__dirname,'uploads')));

app.post('/upload', upload.single('image') , async(req, res) => {
    const { id_user } = req.body;
    const { filename : url } = req.file;

    await Image.create({
        id_user: id_user,
        url: url
    }).then(img => {
        res.json(img);
      });
});
app.post('/register', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});
app.get('/find/:id', (req, res) => {
    User.findOne({
        where : req.params
    })
      .then(user => {
        res.json(user);
      });
});

app.get('/findall', (req, res) => {
     User.findAll().then(projects => {
        res.json(projects);
      })
});

app.put('/update/:id', (req, res) => {

    const NewData = req.body
    User.update(NewData, { where: req.params })  
    .then(updatedMax => {
        res.json(updatedMax);
    })
});

app.delete('/delete/:id', (req, res) => {
    User.destroy({  
        where: req.params
      })
      .then(deleted => {
        res.json(deleted);
      });
});

app.listen(3000);