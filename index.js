const express = require('express');
const db = require('./src/db');

const ProductController = require('./layer/product/controller')


const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/products', ProductController)


app.listen(8000, function () {
    console.log("Run On port 8000");
});
