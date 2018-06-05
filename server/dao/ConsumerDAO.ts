import { getEntityManager, Repository } from "typeorm";
import { Consumer } from "./../entities/Consumer";

export class ConsumerDAO {

    private dao: Repository<Consumer>;

    constructor() {
        this.dao = getEntityManager().getRepository(Consumer);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "consumer",
            innerJoinAndSelect: { 
                "address": "consumer.address",
            }
        });
    }

    save(data: Consumer) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "consumer",
            innerJoinAndSelect: { 
                "address": "consumer.address",
            }
        });
    }

    delete(data: Consumer) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "consumer",
            innerJoinAndSelect: { 
                "address": "consumer.address",
            }
        });
    }

}

Object.seal(ConsumerDAO);
