import { Router } from "express";
import { App } from "../utils/App";
import { ApexReportController } from "./common/ApexReportController";
import { AgencyGRPController } from './common/AgencyGRPController';
import { AppMenuController } from './common/AppMenuController';

import { ProfileController } from './controllers/ProfileController';
import { BranchController } from './controllers/BranchController';
import { ImgController } from './controllers/ImgController';
import { ConsumerController } from './controllers/ConsumerController';
import { AppDataController} from './common/AppDataController';
import { VehicleController } from "./controllers/VehicleController";
import { HabitationsController } from "./controllers/HabitationsController";
import { UserVehicleController } from "./controllers/UserVehicleController";
import { ServiceCodeController } from "./controllers/ServiceCodeController";
import { TrackingRouteController } from './controllers/TrackingRouteController';
import { TrackingController } from "./controllers/TrackingController";
import { TrackingImgController } from "./controllers/TrackingImgController";
// import { DensityMapsController } from "./controllers/DensityMapsController";


export class AppController {
    private router: Router = Router();

    getRouter() {
       // this.router.use("/dataload", );
        this.router.use('/appdata', new AppDataController().getRouter());
        this.router.use('/appmenu', new AppMenuController().getRouter());
        this.router.use("/apexreport", new ApexReportController().getRouter());
        this.router.use("/agencygrp", new AgencyGRPController().getRouter());
        this.router.use("/profile", new ProfileController().getRouter());
        this.router.use("/branch", new BranchController().getRouter());
        this.router.use("/img", new ImgController().getRouter());
        this.router.use('/consumer', new ConsumerController().getRouter());
        this.router.use('/vehicle', new VehicleController().getRouter());
        this.router.use("/habitations", new HabitationsController().getRouter());
        this.router.use("/uservehicle", new UserVehicleController().getRouter());
        this.router.use("/servicecode", new ServiceCodeController().getRouter());
        this.router.use("/trackingroute", new TrackingRouteController().getRouter());
        this.router.use("/tracking", new TrackingController().getRouter());
        this.router.use("/trackingimg", new TrackingImgController().getRouter());
        // this.router.use("/habitations/densitymaps", new DensityMapsController().getRouter());

        return this.router;
    }
}
