import { App } from "../utils/App";
import { Tracking } from "../entities/Tracking";
import { Props } from '../config/Props';
import { TrackingDAO } from "../dao/TrackingDAO";
import { TrackingImgDAO } from '../dao/TrackingImgDAO';
import { TrackingRouteDAO } from '../dao/TrackingRouteDAO';
import { HabitationsDAO } from '../dao/HabitationsDAO';
import { getEntityManager, Repository, QueryBuilder } from 'typeorm';


export class TrackingService {

    public sessionInfo: any;
    private trackingDao: TrackingDAO;
    private trackingImgDao: TrackingImgDAO;
    private trackingRouteDao: TrackingRouteDAO;
    private habitationsDao : HabitationsDAO;
    private tracking = getEntityManager().getRepository(Tracking);

    constructor() {
        this.trackingDao = new TrackingDAO();
        this.trackingImgDao = new TrackingImgDAO();
        this.trackingRouteDao = new TrackingRouteDAO();
        this.habitationsDao = new HabitationsDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.trackingDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.trackingDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async latest(reqData: any) {
        try {
            console.log("reqdata is")
            console.log(reqData);
            reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.trackingDao.searchdesc(reqData);
            //console.log(data);
            let newData = [];
            if(reqData.days != undefined || reqData.days != null){
                let date = new Date();
                let newDate = App.DaysBack(date, reqData.days); 
            }
            if(reqData.status == undefined || reqData.status == null){
                data.forEach(element => {
                    if(element.status != "InProgress"){
                        newData.push(element);
                    }
                });
                return Promise.resolve(newData);
            }
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: any) {
        try {
            if (await this.validate(item)) {
                console.log(item)
                let image = item.image;
                image.replace('\/','/');
                let lat = item.lat;
                let lng = item.lng;
                let newItem = item;
                if (newItem.image) {
                    delete newItem.image;
                }
                let data: any = {};
                if (item.status == "InProgress") {
                    let vehicleData: any = await this.trackingDao.save(newItem);
                    //let routeData: any = await this.habitationsDao.entity(newItem.habitations.id) 
                    let routeSave: any = {
                        id: App.UniqueNumber(),
                        lat:lat,
                        lng:lng,
                        grpcode:this.sessionInfo.grpcode,
                        tracking: {id:vehicleData.id}
                    }
                    let route: any = await this.trackingRouteDao.save(routeSave)
                        data = {
                            id: vehicleData.id,
                            loadImg: image,
                            grpcode: this.sessionInfo.grpcode,
                            updatedBy: this.sessionInfo.id,
                            tracking: { "id": vehicleData.id }
                    }
                    let trackImg: any = await this.trackingImgDao.save(data)
                } else if (item.status == "Delivered") {
                    //console.log("Delivered");
                    let trackImgData: any = await this.trackingImgDao.search({ tracking: item.id })
                    let data: any = {
                        "id": trackImgData[0].id,
                        "doneImg": image,
                        "updatedBy": this.sessionInfo.id
                    }
                    let trackImg: any = await this.trackingImgDao.save(data);
                    let routeSave: any = {
                        id: App.UniqueNumber(),
                        lat:lat,
                        lng:lng,
                        grpcode:this.sessionInfo.grpcode,
                        tracking: {id:newItem.id}
                    }
                    let route: any = await this.trackingRouteDao.save(routeSave)
                    //console.log(newItem);
                    let vehicleData: any = await this.trackingDao.save(newItem);
                    return Promise.resolve({message:"Delivered Successfully"});
                } else if (item.status == "UnDelivered") {
                   // console.log("Undelivered");
                    let routeSave: any = {
                        id: App.UniqueNumber(),
                        lat:lat,
                        lng:lng,
                        grpcode:this.sessionInfo.grpcode,
                        tracking: {id:newItem.id}
                    }
                    let route: any = await this.trackingRouteDao.save(routeSave)
                    let vehicleData: any = await this.trackingDao.save(newItem);
                    return Promise.resolve({message:"UnDelivered"});
                }
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

    async validate(item: any) {
        if (!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        item.grpcode = this.sessionInfo.grpcode;
        item.updatedBy = this.sessionInfo.id;
        if (!item.id) {
            let uid = App.UniqueNumber();
            item.id = uid;
        }
        return true;
    }
}