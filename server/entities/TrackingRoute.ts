import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Tracking } from './Tracking';

@Entity("tracking_route")
export class TrackingRoute { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "day_time"}) 
    dayTime: string;

    @Column({name: "lat"}) 
    lat: number;

    @Column({name: "lng"}) 
    lng: number;

    @Column({name: "grpcode"}) 
    grpcode: string;

    @JoinColumn({name: "tracking_id"})
    @ManyToOne(type => Tracking)
    tracking: Tracking;
}

