const HomeModel = require('../models/HomeModel.js')

exports.homePage = async (req, res) => {
    const docs = await HomeModel.find({titulo: 'elden ring'})
    res.render('index', docs[0])
    return
}

exports.treatPost = (req, res) => {
    const title = req.body.titulo
    const desc = req.body.descricao

    HomeModel.create({
        titulo: title,
        descricao: desc
    })
    .then(data => console.log(data))
    .catch(e => console.log(e))

    res.render('sucess')
    return
}
