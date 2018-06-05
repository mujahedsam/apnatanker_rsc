import { App } from "../../utils/App";
import { AppData } from "../../entities/AppData";
import { AppDataDAO } from "../../dao/AppDataDAO";
import { Props } from '../../config/Props';

export class AppDataService {
    private appDataDao: AppDataDAO;
    public sessionInfo: any;

    constructor() {
        this.appDataDao = new AppDataDAO();
        
    }

    async entity(id: string) {
        try {
            let data: any = await this.appDataDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.appDataDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: AppData) {
        console.log(item);
        try {
            if (await this.validate(item)) {
                let appDataData: any = await this.appDataDao.save(item);
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else {
                let returnData = {
                    message:  Props.INVALID_DATA
                }
                return Promise.reject(returnData);
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete(id: any) {
        try {
            // let data: AppData = await this.appDataDao.entity(id);
            let result: any = await this.appDataDao.delete(id);
            let returnData = {
                id: id,
                message: Props.REMOVED_SUCCESSFULLY
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: AppData){
        console.log(item);
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