// middleware
exports.myMiddleware = (req, res, next) => {
    res.locals.data= {title: 'Formulario'}
    console.log('middleware global')
    next()  
}

exports.checkCsrfErr = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.token) {
        return res.send('bad csrf.')
    } 
}

exports.csrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}