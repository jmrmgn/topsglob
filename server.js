const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const keys = require('./config/keys');
const port = process.env.PORT || 5000;

const usersRoute = require('./routes/api/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/users', usersRoute);

mongoose.connect(
   keys.mongoURI,
   {
      useNewUrlParser: true
   }
)
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

app.listen(port, () => {
   console.log(`Server running in port ${port}`);
});