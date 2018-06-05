import { getEntityManager, Repository } from "typeorm";

export class AdminDashBoard {


    static JoinUsersQuery(reqData, callback) {
        let sqlQuery = `
        SELECT Date_format(consumer.created_on , '%b %y') as name,
            Count(Date_format(consumer.created_on, '%m')) as value
        FROM   consumer AS consumer
         where consumer.grpcode = '${reqData.data.grpcode}'
        GROUP  BY Date_format(consumer.created_on, '%b %y')
       
    `;
        console.log(sqlQuery)
        getEntityManager().query(sqlQuery).then(result => callback(null, result)).catch(err => callback(err, null));
    }
 


}
