import { App } from "../utils/App";
import { ServiceCodeDAO } from "../dao/ServiceCodeDAO"; 
import { Props } from '../config/Props';
import { ServiceCode } from "../entities/ServiceCode";

export class ServiceCodeService {
    
    public sessionInfo: any;
    private serviceCodeDao: ServiceCodeDAO;
      
    constructor() {
        this.serviceCodeDao = new ServiceCodeDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.serviceCodeDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            //  reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.serviceCodeDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: ServiceCode) {
        try {
            if (await this.validate(item)) {
                let uid = App.UniqueNumber();
                if(!item.id || item.id == '' || item.id == '0') {
                    item.id = uid;
                }
                
                let imgData: any = await this.serviceCodeDao.save(item);
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else {
                let returnData = {
                    message: "Please enter proper values."
                }
                return Promise.reject(returnData);
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }

    // async delete(id: any) {
    //     try {
    //         let data: Img = (await this.imgDao.entity(id))
    //         let result: any = await this.imgDao.delete(data);
    //         let returnData = {
    //             id: id,
    //             message: Props.REMOVED_SUCCESSFULLY
    //         }
    //         return Promise.resolve(returnData);
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // }

    async validate(item: ServiceCode){
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        if(!item.id ){
            let uid = App.UniqueNumber();
            item.id = uid;
        }
        return true;
    }
}