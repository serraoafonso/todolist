const express = require('express');
const router = require('./router')

const app = express();

app.use(express.json)//para a API conseguir trabalhar com dados em json
app.use(router)

module.exports = app;