import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Address } from "./Address"; 

@Entity("consumer")
export class Consumer { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "mobile"}) 
    mobile: string;

    @Column({name: "email"}) 
    email: string;

    @Column({name: "aadhar"}) 
    aadhar: string;

    @Column({name: "active"}) 
    active: boolean;

    @Column({name: "grpcode"}) 
    grpcode: string;

    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
    @JoinColumn({name: "address_id"})
    @ManyToOne(type => Address)
    address: Address;
 
}

