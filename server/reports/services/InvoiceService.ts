import Async from 'async';

import { Consumer } from '../support/invoice/consumer';


export class InvoiceService {
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
                Async.apply(Consumer.MainQuery, queryData),
            ], (err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resData.data = {};
                    resData.data.heading = "Consumer Report";
                    resData.data.dataList = result[0];
                    console.log(resData);
                    resolve(resData);                    
                }
            });
        });

    }
}
