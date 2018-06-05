import { Branch } from './../../entities/Branch';
import { getEntityManager, Repository, QueryBuilder } from "typeorm";
import * as url from "url";


export class DataLoadService {
    public sessionInfo: any;
    constructor() {

    }

    codes(request) {
        try {
            let data: any = [];
            data.push(
                { key: "TEST", name: "TEST" }
            )
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }


    branchs(request) {
        try {
            let sqlQuery = `select id, name from branch where grpcode='${this.sessionInfo.grpcode}' and active = 1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    consumers(request) {
        try {
            let sqlQuery = `select id, name from consumer where grpcode='${this.sessionInfo.grpcode}' and active = 1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    vehicles(request) {
        try {
            let sqlQuery = `select id, vehicle_no from vehicle where grpcode='${this.sessionInfo.grpcode}' and active = 1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    users(request) {
        try {
            let sqlQuery = `select id, name from profile where grpcode='${this.sessionInfo.grpcode}' and role='User' and active= 1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    profiles(request) {
        try {
            let sqlQuery = `select id, name from profile where grpcode='${this.sessionInfo.grpcode}' and role not in ('Super Admin') and active= 1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    districts(request) {
        try {
            let sqlQuery = `select DISTINCT district as id, district as name from habitations where grpcode='${this.sessionInfo.grpcode}' and active = 1 `;
            let data = getEntityManager().query(sqlQuery);
            return data;
        } catch(error) {
            return Promise.reject(error);
        }
    }

    servicecodes(request) {
        try {
            let sqlQuery = `select id, name from service_code where active=1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    habitations(request) {
        try {
            let sqlQuery = `select id, habitation from habitations where grpcode='${this.sessionInfo.grpcode}' and active = 1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    roles(request) {
        try {
            let sqlQuery = "select name as id,name from apex_data where code='ROLE' and status=1";
            let data =  getEntityManager().query(sqlQuery);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

   
}    


   