import { getEntityManager, Repository } from "typeorm";
import { Profile } from "./../entities/Profile";
import {Vehicle} from './../entities/Vehicle';

export class VehicleDAO {

    private dao: Repository<Vehicle>;

    constructor() {
        this.dao = getEntityManager().getRepository(Vehicle);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "vehicle", 
            innerJoinAndSelect: { 
                "consumer": "vehicle.consumer",
            },   
        });
    }

    save(data: Vehicle) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "vehicle", 
            innerJoinAndSelect: { 
                "consumer":"vehicle.consumer"
            },   
        });
    }

    delete(data: Vehicle) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "vehicle", 
            innerJoinAndSelect: {
             "profile": "vehicle.profile",
            },  
        });
    }

}

Object.seal(VehicleDAO);
