import { getEntityManager, Repository } from "typeorm";

import { TrackingRoute} from "../entities/TrackingRoute";

export class TrackingRouteDAO {

    private dao: Repository<TrackingRoute>;

    constructor() {
        this.dao = getEntityManager().getRepository(TrackingRoute);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "trackingRoute", 
            innerJoinAndSelect: { 
                "tracking":"trackingRoute.tracking",
                "profile" : "tracking.profile",
                "vehicle" : "tracking.vehicle",
                "habitations" : "tracking.habitations",
                "destination" : "tracking.destination"
            },   
        });
    }

    density(data: any) {
        return this.dao.find(data, {
            alias: "trackingRoute", 
            innerJoinAndSelect: { 
                "tracking":"trackingRoute.tracking",
                "profile" : "tracking.profile",
                "vehicle" : "tracking.vehicle",
                "habitations" : "tracking.habitations",
                "destination" : "tracking.destination"
            },   
        });
    }

    save(data: TrackingRoute) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "trackingRoute", 
            innerJoinAndSelect: { 
                "tracking":"trackingRoute.tracking"
            },   
        });
    }

    delete(data: TrackingRoute) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "trackingRoute", 
            innerJoinAndSelect: {
                "tracking": "trackingRoute.tracking",
            },  
        });
    }

}

Object.seal(TrackingRouteDAO);
