import { getEntityManager, Repository } from "typeorm";
import { Address } from "./../entities/Address";

export class AddressDAO {

    private dao: Repository<Address>;

    constructor() {
        this.dao = getEntityManager().getRepository(Address);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "address", 
        });
    }

    save(data: Address) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "address", 
        });
    }

    delete(data: Address) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "address", 
        });
    }

}

Object.seal(AddressDAO);
