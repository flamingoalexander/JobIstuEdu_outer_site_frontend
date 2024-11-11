const http = require("node:http");
module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target : process.env.API_PATH || 'https://job.istu.edu/'
            },
        }
    },
    outputDir: 'dist/portal',
    productionSourceMap: process.env.NODE_ENV !== 'production',
    publicPath: process.env.NODE_ENV === 'production' ? '/out' : '/'
}
