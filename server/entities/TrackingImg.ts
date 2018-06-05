import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Tracking } from './Tracking';

@Entity("tracking_img")
export class TrackingImg { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "load_img"}) 
    loadImg: string;

    @Column({name: "done_img"}) 
    doneImg: string;

    @Column({name: "grpcode"}) 
    grpcode: string;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
    @JoinColumn({name: "tracking_id"})
    @ManyToOne(type => Tracking)
    tracking: Tracking;
}

