import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { AppDataService } from "../../services/common/AppDataService";
import { Props } from '../../config/Props';

export class AppDataController {

    private router: Router = Router();
    private service: AppDataService = new AppDataService();

    getRouter(): Router {
        this.router.post("/", async(request: Request, response: Response) => {
            let reqData= request.body.data ? request.body.data : {};
            this.service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Search' : ${JSON.stringify(this.service.sessionInfo)}` );
            let result = null;
            
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.search(reqData);
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
                
                if(this.service.sessionInfo.role==Props.ROLE_ADMIN|| this.service.sessionInfo.role==Props.ROLE_SUPER_ADMIN){
           
                    result = this.service.save(reqData);
                   
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
                result = this.service.entity(id);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });
        
        this.router.delete("/:id", async(request: Request,response:Response)=>{
            const id:any=request.params.id;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Delete' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                if(this.service.sessionInfo.role==Props.ROLE_ADMIN|| this.service.sessionInfo.role==Props.ROLE_SUPER_ADMIN){
                    result = this.service.delete(id);
                }
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });
        return this.router;
    }
}