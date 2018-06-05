import { getEntityManager, Repository } from "typeorm";
import { AgencyGRP } from "./../entities/AgencyGRP";

export class AgencyGRPDAO {

    private dao: Repository<AgencyGRP>;

    constructor() {
        this.dao = getEntityManager().getRepository(AgencyGRP);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "agencyGRP",
            innerJoinAndSelect: { 
            }
        });
    }

    save(data: AgencyGRP) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "agencyGRP",
            innerJoinAndSelect: { 
            }
        });
    }

    delete(data: AgencyGRP) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "agencyGRP",
            innerJoinAndSelect: { 
            }
        });
    }

}

Object.seal(AgencyGRPDAO);
