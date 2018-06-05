import { getEntityManager, Repository } from "typeorm";
import { Img } from "./../entities/Img";

export class ImgDAO {

    private dao: Repository<Img>;

    constructor() {
        this.dao = getEntityManager().getRepository(Img);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "img", 
        });
    }

    save(data: Img) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "img", 
        });
    }

    delete(data: Img) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "img", 
        });
    }

}

Object.seal(ImgDAO);
