import { App } from "../utils/App";
import { Vehicle } from "../entities/Vehicle";
import { VehicleDAO } from "../dao/VehicleDAO"; 
import { Props } from '../config/Props';

export class VehicleService {
    
    public sessionInfo: any;
    private vehicleDao: VehicleDAO;
      
    constructor() {
        this.vehicleDao = new VehicleDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.vehicleDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
             reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.vehicleDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: Vehicle) {
        try {
            if (await this.validate(item)) { 
                let vehicleData: any = await this.vehicleDao.save(item); 
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else {
                let returnData = {
                    message: Props.VEHICLENO_EXISTS
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

    async validate(item: Vehicle){
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        item.grpcode=this.sessionInfo.grpcode;
        item.updatedBy = this.sessionInfo.id;
        let data = await this.vehicleDao.search({ vehicleNo: item.vehicleNo, grpcode: item.grpcode });
        if( (item.id && data.length > 1) || (!item.id && data.length > 0) ) {
            return false;
        } else {
        if(!item.id ){
            let uid = App.UniqueNumber();
            item.id = uid;
        }
        return true;
    }
  }
}