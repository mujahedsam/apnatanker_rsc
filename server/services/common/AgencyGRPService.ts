import { App } from "../../utils/App";
import { AgencyGRP } from "../../entities/AgencyGRP";
import { AgencyGRPDAO } from "../../dao/AgencyGRPDAO";
import { BranchDAO } from '../../dao/BranchDAO';
import { ProfileDAO } from '../../dao/ProfileDAO';
import { AddressDAO } from '../../dao/AddressDAO';
import { ImgDAO } from '../../dao/ImgDAO';
import { Props } from '../../config/Props';

export class AgencyGRPService {
    
    public sessionInfo: any;
    private agencyGRPDao: AgencyGRPDAO;
    private branchDao : BranchDAO;
    private profileDao : ProfileDAO;
    private addressDao : AddressDAO;
    private imageDao : ImgDAO;
      
    constructor() {
        this.agencyGRPDao = new AgencyGRPDAO();
        this.branchDao = new BranchDAO();
        this.profileDao = new ProfileDAO();
        this.addressDao = new AddressDAO();
        this.imageDao = new ImgDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.agencyGRPDao.entity(id);
            data.branch = await this.branchDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            let data: any = await this.agencyGRPDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: any) {
        try {
            if (await this.validate(item)) {
                let uid = App.UniqueNumber();
                if(!item.id || item.id == '' || item.id == '0') {
                    return Promise.reject({message: "ID is required !!!"});
                } else {
                    let agencyGRPData: any = await this.agencyGRPDao.save(item);
                    item.branch.id = item.id;
                    item.branch.grpcode = item.id;
                    item.branch.isMain = true;
                    let branchData : any = await this.branchDao.save(item.branch);
                    
                    let newId = uid;
                    if(!item.profile.address ) {
                        item.profile.address = {};
                    }
                    item.profile.address.id = newId;
                    let addressData : any = await this.addressDao.save(item.profile.address);
                    
                    if(!item.profile.img) {
                        item.profile.img = {};
                    }
                    item.profile.img.id = newId;
                    let imageData : any = await this.imageDao.save(item.profile.img);
                    
                    item.profile.id = newId;
                    item.profile.grpcode = item.id;
                    item.profile.role="SuperAdmin";
                    if(!item.profile.branch) {
                        item.profile.branch = {};
                    }
                    item.profile.branch.id = item.id;
                    let profileData : any = await this.profileDao.save(item.profile);
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
    //             message: "Removed Successfully"
    //         }
    //         return Promise.resolve(returnData);
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // }

    async validate(item: any){
        return true;
    }
}