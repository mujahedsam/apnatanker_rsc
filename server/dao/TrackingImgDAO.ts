import { getEntityManager, Repository } from "typeorm";

import { TrackingImg} from "../entities/TrackingImg";

export class TrackingImgDAO {

    private dao: Repository<TrackingImg>;

    constructor() {
        this.dao = getEntityManager().getRepository(TrackingImg);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "trackingImg", 
            innerJoinAndSelect: { 
                "tracking":"trackingImg.tracking"
            },   
        });
    }

    save(data: TrackingImg) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "trackingImg", 
            innerJoinAndSelect: { 
                "tracking":"trackingImg.tracking"
            },   
        });
    }

    delete(data: TrackingImg) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "trackingImg", 
            innerJoinAndSelect: {
                "tracking": "trackingImg.tracking",
            },  
        });
    }

}

Object.seal(TrackingImgDAO);
