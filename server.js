const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const passport = require('passport');

const app = express();

const keys = require('./config/keys');
const port = process.env.PORT || 5000;

const usersRoute = require('./routes/api/users');
const postsRoute = require('./routes/api/posts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
require('./config/passport')(passport);

app.use(expressValidator());

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

app.use((error, req, res, next) => {
   const status = error.statusCode || 500;
   const message = error.message;
   const data = error.data;
   res.status(status).json({message: message, data: data});
});

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