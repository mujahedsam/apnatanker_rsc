import { getEntityManager, Repository } from "typeorm";

import { Profile } from "./../entities/Profile";
import {Vehicle} from './../entities/Vehicle';
import {Habitations} from "./../entities/Habitations";
import {ServiceCode} from "./../entities/ServiceCode";
import { Tracking } from "../entities/Tracking";

export class TrackingDAO {

    private dao: Repository<Tracking>;

    constructor() {
        this.dao = getEntityManager().getRepository(Tracking);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "tracking", 
            innerJoinAndSelect: { 
                "profile": "tracking.profile",
                "vehicle": "tracking.vehicle",
                "servicecode": "tracking.serviceCode",
                "habitations": "tracking.habitations",
                "destination": "tracking.destination"
            },   
        });
    }

    searchdesc(data:any){

        return this.dao.createQueryBuilder("tracking")
               .leftJoinAndSelect("tracking.vehicle", "vehicle")
               .leftJoinAndSelect("tracking.serviceCode", "serviceCode")
               .leftJoinAndSelect("tracking.habitations", "habitations")
               .leftJoinAndSelect("tracking.destination", "destination")
              .where("tracking.profile_id = :data", { data: data.profile })
              .orderBy("tracking.updated_on", "DESC")
              .getMany();
    }

    save(data: Tracking) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "tracking", 
            innerJoinAndSelect: { 
                "profile":"tracking.profile"
            },   
        });
    }

    delete(data: Tracking) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "tracking", 
            innerJoinAndSelect: {
                "profile": "tracking.profile",
                // "vehicle":"tracking.vehicle",
                // "serviceCode":"tracking.serviceCode",
                // "habitations":"tracking.habitations",
                // "destination": "tracking.destination"
            },  
        });
    }

    findTrack(data: any) {
        return this.dao.findOne(data, {
            alias: "tracking"
        });
    }

}

Object.seal(TrackingDAO);
