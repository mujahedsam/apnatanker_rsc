import { getEntityManager, Repository } from "typeorm";
import { ApexReportData } from "./../entities/ApexReportData";

export class ApexReportDataDAO {

    private dao: Repository<ApexReportData>;

    constructor() {
        this.dao = getEntityManager().getRepository(ApexReportData);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "apexReportData",
            innerJoinAndSelect: { 
            }
        });
    }

    save(data: ApexReportData) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "apexReportData",
            innerJoinAndSelect: { 
                "apexReport": "apexReportData.apexReport",
            }
        });
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "apexReportData",
            innerJoinAndSelect: { 
                "apexReport": "apexReportData.apexReport",
            }
        });
    }

}

Object.seal(ApexReportDataDAO);
