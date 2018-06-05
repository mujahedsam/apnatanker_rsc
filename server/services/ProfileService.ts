import { App } from "./../utils/App";
import { Profile } from "./../entities/Profile";
import { ProfileDAO } from "./../dao/ProfileDAO";
import { AddressDAO } from "./../dao/AddressDAO";
import { ImgDAO } from "./../dao/ImgDAO";
import { Props } from '../config/Props';


export class ProfileService {
    public sessionInfo: any;
    private profileDao: ProfileDAO;
    private addressDao: AddressDAO;
    private imgDao: ImgDAO;
    

    constructor() {
        this.profileDao = new ProfileDAO();
        this.addressDao = new AddressDAO();
        this.imgDao = new ImgDAO();
        
    }

    async entity(id: string) {
        try {
            let data: any = await this.profileDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            reqData.grpcode = this.sessionInfo.grpcode;
            let data: any = await this.profileDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async filter(reqData: any){
        try {
            reqData.grpcode = this.sessionInfo.grpcode;
            let profileData: any = await this.profileDao.search(reqData);
            return Promise.reject(profileData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: Profile) {
        try {
            let cond = await this.validate(item);
            if (cond == true) {
                let addressData: any = await this.addressDao.save(item.address);
                let imgData: any = await this.imgDao.save(item.img);
                let profileData: any = await this.profileDao.save(item);
                let returnData = {
                    id: item.id,
                    message: Props.SAVED_SUCCESSFULLY
                }
                return Promise.resolve(returnData);
            } else if(cond == "Email"){
                let returnData = {
                    message: Props.EMAIL_EXISTS
                }
                return Promise.reject(returnData);
            }else if(cond == "Mobile"){
                let returnData = {
                    message: Props.MOBILE_EXISTS
                }
                return Promise.reject(returnData);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete(id: any) {
        try {
            let data: Profile = (await this.profileDao.entity(id))
            let result: any = await this.profileDao.delete(data);
            let returnData = {
                id: id,
                message: Props.REMOVED_SUCCESSFULLY
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: Profile){
        if(!item.id || item.id == '' || item.id == '0') {
            item.id = null;
        }
        item.grpcode=this.sessionInfo.grpcode;
        item.updatedBy = this.sessionInfo.id;
        let query : {};
        let data = await this.profileDao.search({ email: item.email, grpcode: item.grpcode });
        let mdata = await this.profileDao.search({mobile:item.mobile, grpcode: item.grpcode});
        if( (item.id && data.length > 1) || (!item.id && data.length > 0) ) {
            return "Email";
        } else if( (item.id && mdata.length > 1) || (!item.id && mdata.length > 0) ){
            return "Mobile";
        } else {
            if(!item.id ){
                let uid = App.UniqueNumber();
                item.id = uid;
                item.address.id = uid;
                item.img.id = uid;
            }
            return true;
        }

    }
}