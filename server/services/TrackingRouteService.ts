import { TrackingRoute } from './../entities/TrackingRoute';
import { App } from "../utils/App";
import { Props } from '../config/Props';
import { TrackingRouteDAO } from "../dao/TrackingRouteDAO"; 


export class TrackingRouteService {

    public sessionInfo: any;
    private trackingRouteDao:TrackingRouteDAO;

    constructor() {
        this.trackingRouteDao = new TrackingRouteDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.trackingRouteDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
              reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.trackingRouteDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: TrackingRoute) {
        try {
            if (await this.validate(item)) { 
                let vehicleData: any = await this.trackingRouteDao.save(item); 
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

    async validate(item: TrackingRoute){
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        item.grpcode=this.sessionInfo.grpcode;
        // item.updatedBy = this.sessionInfo.id;
        if(!item.id ){
            let uid = App.UniqueNumber();
            item.id = uid;
        }
        return true;
    }


}