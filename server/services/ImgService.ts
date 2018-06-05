import { App } from "./../utils/App";
import { Img } from "./../entities/Img";
import { ImgDAO } from "./../dao/ImgDAO";
import { Props } from '../config/Props';

export class ImgService {
    public sessionInfo: any;
    private imgDao: ImgDAO;
    

    constructor() {
        this.imgDao = new ImgDAO();
        
    }

    async entity(id: string) {
        try {
            let data: any = await this.imgDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: Img) {
        try {
            if (await this.validate(item)) {
                let uid = App.UniqueNumber();
                if(!item.id || item.id == '' || item.id == '0') {
                    item.id = uid;
                }
                
                let imgData: any = await this.imgDao.save(item);
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

    async delete(id: any) {
        try {
            let data: Img = (await this.imgDao.entity(id))
            let result: any = await this.imgDao.delete(data);
            let returnData = {
                id: id,
                message: Props.REMOVED_SUCCESSFULLY
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: Img){
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