module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target :'https://job.istu.edu/'
            },
        }
    }
}