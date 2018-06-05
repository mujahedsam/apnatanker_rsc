import { getEntityManager, Repository } from "typeorm";

import { Profile } from "./../entities/Profile";
import {Vehicle} from './../entities/Vehicle';
import {Habitations} from "./../entities/Habitations";
import {ServiceCode} from "./../entities/ServiceCode";
import { UserVehicle } from "./../entities/UserVehicle";

export class UserVehicleDAO {

    private dao: Repository<UserVehicle>;

    constructor() {
        this.dao = getEntityManager().getRepository(UserVehicle);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "userVehicle", 
            innerJoinAndSelect: { 
                "profile": "userVehicle.profile",
                "vehicle": "userVehicle.vehicle",
                "serviceCode": "userVehicle.serviceCode",
                "habitations": "userVehicle.habitations"
            },   
        });
    }

    save(data: UserVehicle) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "userVehicle", 
            innerJoinAndSelect: { 
                "profile":"userVehicle.profile",
                "vehicle": "userVehicle.vehicle",
                "serviceCode": "userVehicle.serviceCode",
                "habitations": "userVehicle.habitations"
            },   
        });
    }

    delete(data: UserVehicle) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "userVehicle", 
            innerJoinAndSelect: {
             "profile": "userVehicle.profile",
             "vehicle":"userVehicle.vehicle",
             "serviceCode":"userVehicle.serviceCode",
             "habitations":"userVehicle.habitations"
            },  
        });
    }

}

Object.seal(UserVehicleDAO);
