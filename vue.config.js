module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target :'https://job.istu.edu/'
            },
        }
    },
    outputDir: 'dist/portal',
    productionSourceMap: process.env.NODE_ENV !== 'production'
}
