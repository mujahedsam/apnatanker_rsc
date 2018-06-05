import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { ApexReport } from "./ApexReport"; 

@Entity("apex_report_data")
export class ApexReportData { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "status"}) 
    status: boolean;
 
    @JoinColumn({name: "apex_report_id"})
    @ManyToOne(type => ApexReport)
    apexReport: ApexReport;
 
}

