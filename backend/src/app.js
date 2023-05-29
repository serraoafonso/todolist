const express = require('express');
const router = require('./router')
const cors = require('cors')

const app = express();

app.use(express.json())//para a API conseguir trabalhar com dados em json NNAO ME DIGAS QUE ISTO NAO FUCNIONAVA PORQUE TIHA ME ESQUECIDO DOS PARENTESES DEPOIS DE JSON
app.use(cors())//para permitir o aacesso do clienet á api
app.use(router)

module.exports = app;