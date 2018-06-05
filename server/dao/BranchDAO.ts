import { getEntityManager, Repository } from "typeorm";
import { Branch } from "./../entities/Branch";

export class BranchDAO {

    private dao: Repository<Branch>;

    constructor() {
        this.dao = getEntityManager().getRepository(Branch);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "branch", 
            innerJoinAndSelect: { 
            },   
        });
    }

    save(data: Branch) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "branch", 
            innerJoinAndSelect: { 
            },   
        });
    }

    delete(data: Branch) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "branch", 
            innerJoinAndSelect: {
            },  
        });
    }

}

Object.seal(BranchDAO);
