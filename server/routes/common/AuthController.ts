import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { AuthService } from "../../services/common/AuthService";

export class AuthController {

    private router: Router = Router();
    private authService: AuthService;
    constructor(){
        this.authService = new AuthService();
    }
    checkProceed(request: Request){
        
    }
    getRouter(): Router {
        this.router.post("/", async(request: Request, response: Response) => {
            let reqData: any = request.body;
            let sessionInfo: any = {};
            let result: any = null;
            console.log(reqData.data);
            if(reqData.data && reqData.data.grpcode){
                sessionInfo.grpcode = reqData.data.grpcode;
                this.authService.sessionInfo = sessionInfo;
                result = this.authService.retrieve(reqData.data);
            } else {
                result = {message: "Invalid Data"};
            }
            App.Send(request, response, result);
        });

        this.router.post("/user", async(request: Request, response: Response) => {
            let reqData: any = request.body;
            let sessionInfo: any = {};
            let result: any = null;
            console.log(reqData.data);
            if(reqData.data && reqData.data.grpcode){
                sessionInfo.grpcode = reqData.data.grpcode;
                this.authService.sessionInfo = sessionInfo;
                result = this.authService.retrieve(reqData.data);
            } else {
                result = {message: "Invalid Data"};
            }
            App.Send(request, response, result);
        });
        
        //Forgot Password Controller
        this.router.put("/forgotpassword", async(request: Request, response: Response) => {
            let reqData: any = request.body;
            // let sessionInfo: any = {};
             let result: any = null;
            console.log(reqData.data);
            if(reqData.data){
                // sessionInfo.grpcode = reqData.data.grpcode;
                // this.authService.sessionInfo = sessionInfo;
                result = this.authService.forgotPassword(reqData.data);
            } else {
                result = {message: "Invalid Data"};
            }
            App.Send(request, response, result);
        });
        
        //Reset Password
        this.router.put("/resetpassword", async(request: Request, response: Response) => {
            let reqData: any = request.body;
            // let sessionInfo: any = {};
             let result: any = null;
            console.log(reqData.data);
            if(reqData.data && reqData.data.grpcode){
               // sessionInfo.grpcode = reqData.data.grpcode;
                //this.authService.sessionInfo = sessionInfo;
                result = this.authService.resetPassword(reqData.data);
            } else {
                result = {message: "Invalid Data"};
            }
            App.Send(request, response, result);
        });
        return this.router;
    }
}