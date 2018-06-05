import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { AppMenuService } from "../../services/common/AppMenuService";
import { Props } from '../../config/Props';

export class AppMenuController {

    private router: Router = Router();
    private service = new AppMenuService();

    getRouter(): Router { 

        this.router.put("/", async(request: Request, response: Response) => {
            let reqData= request.body.data ? request.body.data : {};
            this.service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Save' : ${JSON.stringify(this.service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.save(reqData);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });

        this.router.get("/:role", async(request: Request,response:Response)=>{
            let role:any=request.params.role;
            let newID = role.toUpperCase()
            let id = newID.replace(" ", "_")
            console.log(id)
            let reqData= request.body.data ? request.body.data : {};
            this.service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Search' : ${JSON.stringify(this.service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                reqData.grpcode = this.service.sessionInfo.grpcode;
                reqData.role = id;
                result = this.service.search(reqData);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });


        return this.router;
    }
}