import Async from 'async';

import { Consumer } from '../support/report/consumer';


export class ReportService {
    public sessionInfo: any;
    constractor() {}
    
    consumers(reqData: any) {
        let resData: any = {};
        resData.data = {};
        let queryData: any = {};
        queryData.data = reqData.query;
        queryData.data.grpcode = this.sessionInfo.grpcode;
        return new Promise((resolve, reject) => {
            Async.parallel([
                Async.apply(Consumer.HeadQuery, queryData),
                Async.apply(Consumer.MainQuery, queryData),
            ], (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resData.data = {};
                    resData.data.heading = "Consumer Report";
                    resData.data.groupHead = result[0];
                    resData.data.dataList = result[1];
                    console.log(resData);
                    resolve(resData);                    
                }
            });
        });

    }
}
