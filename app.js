const express = require('express');
const dotenv = require('dotenv');
const hbs = require('hbs');
const path = require('path');
const app = express();
const moment = require('moment');

dotenv.config({path:'./config/config.env'});


// view path
const views_path = path.join(__dirname, '/views');
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', views_path)
app.set('view engine', 'hbs');


// Using Meddlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// hbs helpers
hbs.registerHelper('formatDate',(date)=>{
    return moment.parseZone(date).format('LLL')
})

// Importing Routes
const customer = require('./routes/customer');
const transfer = require('./routes/transfer');


// Using Routes
app.use("/api/v1", customer);
app.use("/api/v1", transfer);

app.get('/', (req,res)=>{
    res.render('index')
})

module.exports = app;
