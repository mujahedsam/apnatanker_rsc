import { App } from "../utils/App";
import { Consumer } from "../entities/Consumer";
import { ConsumerDAO } from "../dao/ConsumerDAO"; 
import { AddressDAO } from "./../dao/AddressDAO";
import { Props } from '../config/Props';

export class ConsumerService {
    
    public sessionInfo: any;
    private consumerDao: ConsumerDAO;
        private addressDao: AddressDAO;
      
    constructor() {
        this.consumerDao = new ConsumerDAO();
        this.addressDao = new AddressDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.consumerDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.consumerDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: Consumer) {
        try {
            if (await this.validate(item)) {
                 let addressData: any = await this.addressDao.save(item.address);
                let consumerData: any = await this.consumerDao.save(item); 
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else {
                let returnData = {
                    message: Props.MOBILE_EXISTS
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
    //             message: "Removed Successfully"
    //         }
    //         return Promise.resolve(returnData);
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // }

    async validate(item: Consumer){
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        item.grpcode=this.sessionInfo.grpcode;
        item.updatedBy = this.sessionInfo.id;
        let data = await this.consumerDao.search({ mobile: item.mobile, grpcode: item.grpcode });
        console.log(data.length);
        console.log(item);
        if( (item.id && data.length > 1) || (!item.id && data.length > 0) ){
            return false;
        } else {
            item.updatedBy = this.sessionInfo.id;
            if(!item.id ){
                let uid = App.UniqueNumber();
                item.id = uid;
                item.address.id = uid;
            }
            return true;
        }

    }
}