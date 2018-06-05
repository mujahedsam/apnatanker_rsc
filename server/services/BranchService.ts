import { App } from "../utils/App";
import { Branch } from "../entities/Branch";
import { BranchDAO } from "../dao/BranchDAO"; 
import { Props } from '../config/Props';

export class BranchService {
    
    public sessionInfo: any;
    private branchDao: BranchDAO;
    
      
    constructor() {
        this.branchDao = new BranchDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.branchDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
             reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.branchDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: Branch) {
        try {
            if (await this.validate(item)) {
                let branchData: any = await this.branchDao.save(item); 
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else {
                let returnData = {
                    message: Props.INVALID_DATA
                }
                return Promise.reject(returnData);
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }

    // async delete(id: any) {
    //     try {
    //         let data: ApexReport = (await this.apexReportDao.entity(id))
    //         let result: any = await this.apexReportDao.delete(data);
    //         let returnData = {
    //             id: id,
    //             message: Props.REMOVED_SUCCESSFULLY
    //         }
    //         return Promise.resolve(returnData);
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // }

    async validate(item: Branch){
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        item.grpcode=this.sessionInfo.grpcode;
        item.updatedBy = this.sessionInfo.id;
        if(!item.id ){
            let uid = App.UniqueNumber();
            item.id = uid;
        }
        return true;
    }
}