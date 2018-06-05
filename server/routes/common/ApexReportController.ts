import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { ApexReportService } from "../../services/common/ApexReportService";
import { Props } from '../../config/Props';

export class ApexReportController {

    private router: Router = Router();
    private service: ApexReportService = new ApexReportService();

    getRouter(): Router {
        this.router.post("/", async(request: Request, response: Response) => {
            let reqData= request.body ? request.body.data : {};
            this.service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Search' : ${JSON.stringify(this.service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                if(this.service.sessionInfo.role && this.service.sessionInfo.role.indexOf(Props.ROLE_SUPER_ADMIN) > -1) {
                     result = this.service.search(reqData);
                } else {
                    result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.INVALID_AUTH} )
                }
               
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);

        });
        this.router.put("/", async(request: Request, response: Response) => {
            let reqData= request.body ? request.body.data : {};
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Save' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                if(this.service.sessionInfo.role && this.service.sessionInfo.role.indexOf(Props.ROLE_SUPER_ADMIN) > -1) {
                     result = this.service.save(reqData);
                } else {
                    result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.INVALID_AUTH} )
                }
               
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });

        this.router.get("/:id", async(request: Request,response:Response)=>{
            const id:any=request.params.id;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Entity' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                if(this.service.sessionInfo.role && this.service.sessionInfo.role.indexOf(Props.ROLE_SUPER_ADMIN) > -1) {
                     result = this.service.entity(id);
                } else {
                    result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.INVALID_AUTH} )
                }
               
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });
        return this.router;
    }
}