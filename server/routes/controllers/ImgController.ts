import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { ImgService } from "../../services/ImgService";
import { Props } from '../../config/Props';

export class ImgController {

    private router: Router = Router();
    private service: ImgService = new ImgService();

    getRouter(): Router {

        this.router.put("/", async(request: Request, response: Response) => {
            let reqData= request.body ? request.body.data : {};
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : 'Save' : ${JSON.stringify(this.service.sessionInfo)}` );
            this.service.sessionInfo =  request.body.sessionInfo;
            let result = null;
            if(App.CheckSessionInfo(this.service.sessionInfo) ){
                result = this.service.save(reqData);
            } else {
                result = Promise.reject( this.service.sessionInfo ? this.service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Send(request, response, result);
        });

        this.router.get("/:id", async(request: Request,response:Response)=>{
            const id:any=request.params.id;
            let result = null;
                result = this.service.entity(id);
            App.Send(request, response, result);
        });
        return this.router;
    }
}