import { App } from "../utils/App";
import { Habitations } from "../entities/Habitations";
import { Tracking } from "../entities/Tracking";
import { TrackingRoute } from "../entities/TrackingRoute";
import { HabitationsDAO } from "../dao/HabitationsDAO"; 
import { Props } from '../config/Props';
import { TrackingDAO } from '../dao/TrackingDAO';
import { TrackingRouteDAO } from '../dao/TrackingRouteDAO';
import { getEntityManager, Repository, QueryBuilder } from 'typeorm';


export class HabitationsService {
    
    public sessionInfo: any;
    private habitationDao: HabitationsDAO;
    private trackingDao : TrackingDAO;
    private trackingRouteDao : TrackingRouteDAO;
    private habiManager = getEntityManager().getRepository(Habitations);
    private trackManager = getEntityManager().getRepository(Tracking);
    private trackRouteManager = getEntityManager().getRepository(TrackingRoute);
      
    constructor() {
        this.habitationDao = new HabitationsDAO();
        this.trackingDao = new TrackingDAO();
        this.trackingRouteDao = new TrackingRouteDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.habitationDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
             reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.habitationDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: Habitations) {
        try {
            if (await this.validate(item)) { 
                let vehicleData: any = await this.habitationDao.save(item); 
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

    async density(reqData: any) {
        try {
            console.log(reqData);
            reqData.grpcode = this.sessionInfo.grpcode;
           let data: any = await this.habiManager.createQueryBuilder('habitations')
           .select(["id","lat", "lng"])
           .where("district = :district",{district:reqData.district})
           .andWhere("grpcode = :grpcode",{grpcode:reqData.grpcode})
           .execute();
           data = JSON.parse(JSON.stringify(data));
           let track : any = [];
           for(let i=0; i<data.length; i++) {
                let t : any = await this.trackingDao.findTrack({habitations_id:data[i].id});
                if(t != undefined){
                    track.push(t);
                }
            };
            console.log(track)
            let density : any = [];
            for(let i=0; i<track.length; i++){
                let d : any = await this.trackingRouteDao.density({tracking_id:track[i].id})
                density.push(d)
            }
            //console.log(density)
            let boundaries : any = [];
            for(let i=0; i<density.length; i++){
                boundaries.push(density[i][0]);
            }
           return Promise.resolve({density:boundaries,boundaries:{lat:data[0].lat,lng:data[0].lng}})
       } catch (error) {
           return Promise.reject(error);
       }
    }

    // async density(reqData: any) {
    //     try {
    //         reqData.grpcode = this.sessionInfo.grpcode;
    //        let data: any = await this.habitationDao.density(reqData);
    //     data = JSON.parse(JSON.stringify(data));
    //        return Promise.resolve(data)
    //    } catch (error) {
    //        return Promise.reject(error);
    //    }
    // }

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

    async validate(item: Habitations){
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