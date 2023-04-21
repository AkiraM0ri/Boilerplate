// dependencias e porta do servidor
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes')
const path = require('path')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const flash = require('connect-flash')
const csrf = require('csurf')
const helmet = require('helmet')
const port = 3000

// connection string
require('dotenv').config()

// conexao com banco de dados mongoDB
const signal = 'ready'
mongoose.set("strictQuery", true);
mongoose.connect(process.env.CONNECTSTR)
.then(() =>{
    console.log('conectei no database')
    // emite a mensagem depois de conectar ao mongo, para abrir ao servidor
    app.emit(signal)
})
.catch(e => console.log(e))

// usa o helmet
// app.use(helmet())

// middlewares
const { myMiddleware, checkCsrfErr, csrfToken } = require('./src/middlewares/middleware')

// tratamento para o express usar o body
app.use(express.urlencoded({ extended: true }))

// arquivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')))

// configuracao da session
const sessionOptions = session({
    secret: 'jskdf93q2urwoifpa+=123d=-=as0-d',
    store: mongoStore.create({ mongoUrl: process.env.CONNECTSTR }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 //tempo q vai durar o cookie (7dias)
    } 
})

// chamada do flash e do session
app.use(sessionOptions)
app.use(flash())

// redenizacao do html
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// usa o csurf
app.use(csrf())
// usa os middlewares globais
app.use(myMiddleware)
app.use(checkCsrfErr)
app.use(csrfToken)
// usa as rotas criadas
app.use(routes)

// abre o servidor depois do sinal
app.on(signal, () => {
    // server
    app.listen(port, ()=> console.log(`aberto na porta ${port}`))
})