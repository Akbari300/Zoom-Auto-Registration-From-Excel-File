const express = require('express');
const Dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const ExcelRouters = require('./routes/excelRouters');
const viewRouter = require('./routes/viewRouters');
const app = express();
app.use(express.json());

Dotenv.config({path: './config.env'});
app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', viewRouter);
app.use('/api/v1/excel', ExcelRouters);

const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{
    console.log(`listening on port ${port}...`);
});