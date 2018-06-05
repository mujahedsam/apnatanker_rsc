import { getEntityManager, Repository } from "typeorm";
import { Profile } from "./../entities/Profile";

export class ProfileDAO {

    private dao: Repository<Profile>;

    constructor() {
        this.dao = getEntityManager().getRepository(Profile);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "profile", 
            innerJoinAndSelect: { 
                "address": "profile.address",
                "branch": "profile.branch"
            },   
        });
    }

    save(data: Profile) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "profile", 
            innerJoinAndSelect: { 
                 "address": "profile.address",             
                "branch": "profile.branch",
                "img": "profile.img"
            },   
        });
    }

    delete(data: Profile) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "profile", 
            innerJoinAndSelect: {
            "address": "profile.address",
             "branch": "profile.branch",
             "img":"profile.img"
            },  
        });
    }

}

Object.seal(ProfileDAO);
