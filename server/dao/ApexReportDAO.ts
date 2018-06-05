import { getEntityManager, Repository } from "typeorm";
import { ApexReport } from "./../entities/ApexReport";

export class ApexReportDAO {

    private dao: Repository<ApexReport>;

    constructor() {
        this.dao = getEntityManager().getRepository(ApexReport);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "apexReport",
            innerJoinAndSelect: { 
               
            }
        });
    }

    save(data: ApexReport) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "apexReport",
            innerJoinAndSelect: { 
               
            }
        });
    }


    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "apexReport",
            innerJoinAndSelect: { 
            }
        });
    }

}

Object.seal(ApexReportDAO);
