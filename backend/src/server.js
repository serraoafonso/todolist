const app = require('./app')

require('dotenv').config()

const port = process.env.PORT || 3333

app.listen(port, ()=>console.log(`Servidor Rodando na porta ${port}`))