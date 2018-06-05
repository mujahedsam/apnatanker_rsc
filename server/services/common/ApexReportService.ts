import { App } from "../../utils/App";
import { ApexReport } from "../../entities/ApexReport";
import { ApexReportDAO } from "../../dao/ApexReportDAO"; 
import { ApexReportData } from "../../entities/ApexReportData";
import { ApexReportDataDAO } from "../../dao/ApexReportDataDAO"; 
import { Props } from '../../config/Props';
export class ApexReportService {
    
    public sessionInfo: any;
    private apexReportDao: ApexReportDAO;
    private apexReportDataDao: ApexReportDataDAO;
      
    constructor() {
        this.apexReportDao = new ApexReportDAO();
        this.apexReportDataDao = new ApexReportDataDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.apexReportDao.entity(id);
            data.apexReportDataList = await this.apexReportDataDao.search({apexReport: data.id});
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            let data: any = await this.apexReportDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: ApexReport) {
        try {
            if (await this.validate(item)) {

                let apexReportData: any = await this.apexReportDao.save(item); 
                for( let element of item.apexReportDataList) {
                    if(!element.id || element.id == '' || element.id == '0') {
                        element.id = item.id+"_"+App.UniqueNumber();
                    }
                    if(!element.apexReport) {
                         element.apexReport = new ApexReport();
                    }
                    element.apexReport.id = item.id;
                    await this.apexReportDataDao.save(element);                   
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

    async validate(item: ApexReport){
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