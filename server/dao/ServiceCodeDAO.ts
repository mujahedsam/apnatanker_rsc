import { getEntityManager, Repository } from "typeorm";

import { ServiceCode } from "../entities/ServiceCode";

export class ServiceCodeDAO {

    private dao: Repository<ServiceCode>;

    constructor() {
        this.dao = getEntityManager().getRepository(ServiceCode);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "serviceCode", 
            innerJoinAndSelect: { 
                
            },   
        });
    }

    save(data: ServiceCode) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "serviceCode", 
            innerJoinAndSelect: { 
                
            },   
        });
    }

    delete(data: ServiceCode) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "serviceCode", 
            innerJoinAndSelect: {
            
            },  
        });
    }

}

Object.seal(ServiceCodeDAO);
