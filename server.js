const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require('morgan');
const passport = require('passport');
const bb =  require('express-busboy');
const SourceMapSupport = require('source-map-support');

const users = require('./routes/api/users');
const todo = require('./routes/api/todo');


const app = express();

// express-busboy to parse mutible/form-data
bb.extend(app)

// allow-cors
app.use(function(req,res, next){
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-Type, Accept');
    next();
})

// configure app
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

// DB uri
const uri = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// add source map support 
SourceMapSupport.install();


// passport middleware 
app.use(passport.initialize());

require('./config/passport')(passport); 

// Routes
app.use('/api/users', users);
app.use('/api/todos',todo);

app.get('/',(req,res)=> {
    return res.end('Api is Working');
});

// catch 404 
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found</h2>')
})

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));