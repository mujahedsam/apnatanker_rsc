import Async from 'async';

import { AdminDashBoard } from '../support/dashboard/AdminDashBoard';

export class DashBoardService {
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
                Async.apply(AdminDashBoard.JoinUsersQuery, queryData),
            ], (err, result) => {
                resData = result[0];
                resolve(resData);
            });
        });

    }

}
