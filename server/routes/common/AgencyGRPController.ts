import { Router, Request, Response } from "express";
import { App } from "../../utils/App";
import { AgencyGRPService } from "../../services/common/AgencyGRPService";

export class AgencyGRPController {

    private router: Router = Router();
    private service = new AgencyGRPService();

    getRouter(): Router {
        this.router.post("/", async(request: Request, response: Response) => {
            let reqData= request.body ? request.body.data : {};
            const result = this.service.search(reqData);
            App.Send(request, response, result);

        });
        this.router.put("/", async(request: Request, response: Response) => {
            let reqData= request.body ? request.body.data : null;
            let result = this.service.save(reqData);
            App.Send(request, response, result);
        });

        this.router.get("/:id", async(request: Request,response:Response)=>{
            const id:any=request.params.id;
            const result = this.service.entity(id);
            App.Send(request, response, result);
        });

        // this.router.delete("/:id", async(request:Request,response:Response)=>{
        //     const id:any=request.params.id;
        //     const result = this.apexMenuService.delete(id);
        //     App.Send(request, response, result);
        // });

        return this.router;
    }
}