module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target :'http://localhost:8000/'
            },
        }
    },
    outputDir: 'dist/portal',
    productionSourceMap: process.env.NODE_ENV !== 'production',
    publicPath: process.env.NODE_ENV === 'production' ? '/out' : '/'
}
