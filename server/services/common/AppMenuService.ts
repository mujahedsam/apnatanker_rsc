import { App } from "../../utils/App";
import { AppMenu } from "./../../entities/AppMenu";
import { AppMenuDAO } from "./../../dao/AppMenuDAO"; 
import { Props } from '../../config/Props';

export class AppMenuService {
    public sessionInfo: any;
    private appMenuDao: AppMenuDAO;

    constructor() {
        this.appMenuDao = new AppMenuDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.appMenuDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.appMenuDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(items: AppMenu[]) {
        try {
            if (await this.validate(null)) {
             for( let element of items) {
                if(element.id){
                    element.grpcode = this.sessionInfo.grpcode;
                    await this.appMenuDao.save(element); 
                }
             }
            let returnData = {
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

    async validate(item: AppMenu){
        return true;
    }
}