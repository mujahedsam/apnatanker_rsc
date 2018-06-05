import { Router, Request, Response } from "express";
import { App }from '../../utils/App';
import { Props } from '../../config/Props';
import { InvoiceService } from '../services/InvoiceService';
import { ReportService } from '../services/ReportService';
import * as fs from "fs";
export class ReportController {
    private invoiceRouter: Router = Router();
    private dataRouter: Router = Router();
    private printRouter: Router = Router();

    getInvoiceRouter() {
        this.invoiceRouter.get("/:category", async (request: Request, response: Response) => {
            const category = request.params.category;
            const template = "invoice_"+category;
            const service: InvoiceService = new InvoiceService()
            service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : ${category} : ${JSON.stringify(service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(service.sessionInfo)){
                try{
                    result = service[category](request);
                }catch( error) {
                    result = Promise.reject({message: "Invalid category"});
                }               
            } else {
                result = Promise.reject( service.sessionInfo ? service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Print(template, response, result);
        });
        return this.invoiceRouter;
    }
    
    getDataRouter() {
        this.dataRouter.get("/:category", async (request: Request, response: Response) => {
            const category = request.params.category;
            const template = category;
            const service: ReportService = new ReportService()
            service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : ${category} : ${JSON.stringify(service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(service.sessionInfo)){
                try{
                    result = service[category](request);
                }catch( error) {
                    result = Promise.reject({message: "Invalid category"});
                }               
            } else {
                result = Promise.reject( service.sessionInfo ? service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
             App.Send(request, response, result);
        });
        return this.dataRouter;
    }
    
    getPrintRouter() {
        this.printRouter.get("/:category", async (request: Request, response: Response) => {
            const category = request.params.category;
            const template = "report_"+category;
            const service: ReportService = new ReportService()
            service.sessionInfo =  request.body.sessionInfo;
            console.log( `${(new Date()).toISOString()} : ${this.constructor.name} : ${category} : ${JSON.stringify(service.sessionInfo)}` );
            let result = null;
            if(App.CheckSessionInfo(service.sessionInfo)){
                try{
                    result = service[category](request);
                }catch( error) {
                    result = Promise.reject({message: "Invalid category"});
                }               
            } else {
                result = Promise.reject( service.sessionInfo ? service.sessionInfo : { message: Props.TOKEN_MESSAGE} )
            }
            App.Print(template, response, result);
        });
        return this.printRouter;
    }
}
