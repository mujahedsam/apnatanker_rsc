import { getEntityManager, Repository } from "typeorm";

export class Consumer {
    constractor() {}
    static conditions(reqData, sqlQuery) {
        // if (reqData.branchid) {
        //     sqlQuery = sqlQuery + ` and receipts.branch_id= '${reqData.branchid}' `;
        // }
        // if (reqData.fromdate) {
        //     reqData.fromdate = new Date(reqData.fromdate).toISOString();
        //     sqlQuery = sqlQuery + ` and receipts.txn_date >= '${reqData.fromdate}' `;
        // }
        // if (reqData.todate) {
        //     reqData.todate = new Date(reqData.todate).toISOString();
        //     sqlQuery = sqlQuery + ` and receipts.txn_date <= '${reqData.todate}' `;
        // }
        if (reqData.data.id) {
            sqlQuery = sqlQuery + ` and consumer.id= '${reqData.data.id}' `;
        }
        return sqlQuery;
    }

    static MainQuery(reqData, callback) {
        let sqlQuery = `
            SELECT  name as name,
                    email as email,
                    mobile as mobile,
                    city as city,
                    state as state,
                    country as country
            FROM   consumer AS consumer
                inner join address as address
                    on (address.id = consumer.address_id)
            where grpcode='${reqData.data.grpcode}'
        `;
            sqlQuery = Consumer.conditions(reqData, sqlQuery);
            console.log(sqlQuery)
            getEntityManager().query(sqlQuery).then(result => callback(null, result)).catch(err => callback(err, null));
    }


    static HeadQuery (reqData, callback) {
        let sqlQuery = `
    		select count(1) as Count
    		FROM   consumer AS consumer
            where grpcode='${reqData.data.grpcode}'
    	`;
        sqlQuery = Consumer.conditions(reqData, sqlQuery);
        getEntityManager().query(sqlQuery).then(result => callback(null, result)).catch(err => callback(err, null));
    }

}
