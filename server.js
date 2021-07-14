if(process.env.NODE_ENV !== 'production'){
    require('dotenv').parse();
}
const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')

app.use(expressLayout);
app.use(express.static('public'))

app.use('/', indexRouter)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATA_BASE_URL , { useNewUrlParser : true})
const db = mongoose.Connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log("connnected to mongoose"))
// Listen
var port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Listening on localhost:'+ port);
});
