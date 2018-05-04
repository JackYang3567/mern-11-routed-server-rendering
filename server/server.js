import path from 'path';
import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';

import credentials from '../config/credentials.config';

import issues_route from'./routes/issue.route';

//
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config';
//
import renderedPageRouter from './renderedPageRouter.jsx';

const app = express();
app.use(express.static('public'));

app.use(bodyParser.json());


  
// database configuration MongoDB数据库连接设置
import mongoose  from 'mongoose';
var options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, options);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, options);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}


//HMR 
if (process.env.NODE_ENV !== 'production') {
    /*
    import webpack from 'webpack';
    import webpackDevMiddleware from 'webpack-dev-middleware';
    import webpackHotMiddleware from 'webpack-hot-middleware';
  
    import config from '../webpack.config';
    */
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  
    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}


app.use('/', issues_route);
app.use('/', renderedPageRouter);
/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});
*/

app.listen(3000, function () {
    console.log('App started on port 3000');
});
