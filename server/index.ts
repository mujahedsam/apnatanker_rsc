const newrelic = require('newrelic');
import * as express from "express";
import { json, urlencoded } from "body-parser";
import * as http from "http";
import * as jsreport from "jsreport";

import "reflect-metadata";

import {App as AppUtil} from "./utils/App";


const app: express.Application = express();
app.use(json());
// app.use(urlencoded({
//     extended: true
// }));

var parsePost = function(req, callback) {
    var data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        if (data != '') {
            data = JSON.parse(data);
        }
        callback(data);
    });
}

var addSessionInfo = function(req){
    let sessionInfo = AppUtil.decodeJWT(req.headers['authorization']);
    console.log("sessionInfo: ");
    console.log(sessionInfo);
    console.log("--------------------------------------------------");
    if(!req.body){
         req.body = {};
    }
    req.body.sessionInfo = sessionInfo;
}

app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'accept, Content-Type, Authorization');
    if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/x-www-form-urlencoded') > -1) {
        parsePost(req, function(data) {
            if (data && data != '') {
                req.body = data;
            }
            addSessionInfo(req);
            next();
        });
    } else {
        addSessionInfo(req);
        next();
    }

});


app.get("/", (request: express.Request, response: express.Response) => {
    response.json({
        name: "ApnaTanker Node App Development"
    })
});

app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {

    response.status(err.status || 500);
    response.json({
        error: "Server error"
    })
});
import { AppController } from './routes/AppController';
import { ReportController } from './reports/controllers/ReportController';
import { DashBoardController } from './reports/controllers/DashBoardController';
import { AuthController } from './routes/common/AuthController';
import { DataLoadController } from './routes/common/DataLoadController';


import { APIDocs } from './swagger/ApiDocs';

import { createConnection } from "typeorm";
createConnection().then(async connection => {


    let reportController = new ReportController();
    app.use('/api/report/invoice', reportController.getInvoiceRouter());
    app.use('/api/report/data', reportController.getDataRouter());
    app.use('/api/report/print', reportController.getPrintRouter());

    let dashBoardController = new DashBoardController();
    app.use('/api/dashboard', dashBoardController.getRouter());

    let dataLoadController = new DataLoadController();
    app.use('/api/dataload', dataLoadController.getRouter());
    
    let authController = new AuthController();
    app.use('/api/auth', authController.getRouter());
    
    let appController = new AppController();
    app.use('/api', appController.getRouter());


    let apiDocs = new APIDocs();
    app.use('/swagger', apiDocs.getRouter());

    var server = http.createServer(app);
    
    server.listen( process.env.PORT || 9000, function(){
      var addr = server.address();
      console.log("server listening at ", addr.address + ":" + addr.port+"");
    });


    // let reportingApp = express();
    // let jsreportInstance = jsreport({
    //     express: { app :reportingApp, server: server },
    //     appPath: "/reporting"
    //   });
      
    //   jsreportInstance.init().catch(function (e) {
    //     console.error('error initializing jsreport:', e);
    //   });
}).catch(error => console.log("TypeORM connection error: ", error));

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

// import { DataAccess } from "./config/DataAccess";
// new DataAccess();
