import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Consumer } from './Consumer';

@Entity("vehicle")
export class Vehicle { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "vehicle_no"}) 
    vehicleNo: string;

    @Column({name: "vehicle_condition"}) 
    vehicleCondition: string;

    @Column({name: "capacity"}) 
    capacity: string;
    
    @Column({name: "active"}) 
    active: boolean;

    @Column({name: "grpcode"}) 
    grpcode: string;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
    @JoinColumn({name: "consumer_id"})
    @ManyToOne(type => Consumer)
    consumer: Consumer;
}

