import { getEntityManager, Repository } from "typeorm";

import { Habitations } from "../entities/Habitations";

export class HabitationsDAO {

    private dao: Repository<Habitations>;

    constructor() {
        this.dao = getEntityManager().getRepository(Habitations);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "habitations", 
            innerJoinAndSelect: { 
              
            },   
        });
    }

    save(data: Habitations) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "habitations", 
            innerJoinAndSelect: { 
            },   
        });
    }

    density(data: any) {
        return this.dao.createQueryBuilder("habitations")
            .select(["id"])
            .where(data)
            .execute()
    }

    delete(data: Habitations) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "habitations", 
            innerJoinAndSelect: {
           
            },  
        });
    }

}

Object.seal(HabitationsDAO);
