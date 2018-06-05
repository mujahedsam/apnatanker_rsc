import { getEntityManager, Repository } from "typeorm";
import { ApexData } from "./../entities/ApexData";

export class ApexDataDAO {

    private dao: Repository<ApexData>;

    constructor() {
        this.dao = getEntityManager().getRepository(ApexData);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "apexData",
            innerJoinAndSelect: { 
            }
        });
    }

    save(data: ApexData) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "apexData",
            innerJoinAndSelect: { 
            }
        });
    }

    delete(data: ApexData) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "apexData",
            innerJoinAndSelect: { 
            }
        });
    }

}

Object.seal(ApexDataDAO);
