import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";
 
import { ApexReportData } from "./ApexReportData";

@Entity("apex_report")
export class ApexReport { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "report_url"}) 
    reportUrl: string;
  
    apexReportDataList: ApexReportData [];

}

