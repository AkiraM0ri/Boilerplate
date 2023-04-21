const mongoose = require('mongoose')

// schema
const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String,
},{
    versionKey: false
})

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel