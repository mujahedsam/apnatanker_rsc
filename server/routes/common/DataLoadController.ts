import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { Props } from '../../config/Props';

import { DataLoadService } from "../../services/common/DataLoadService";

export class DataLoadController {
    private router: Router = Router();
    private service: any = null;
    constructor() {
        this.service = new DataLoadService();
    }
    getRouter(): Router {
        this.router.get("/:category", async (request: Request, response: Response) => {
            const category = request.params.category;
            this.service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : ${category} : ${JSON.stringify(this.service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo)){
                try{
                    result = this.service[category](request);
                }catch( error) {
                    result = Promise.reject({message: "Invalid category"});
                }               
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }

            App.Send(request, response, result);
        });
        return this.router;
    }
}
