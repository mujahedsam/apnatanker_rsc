import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "./Branch";
import { Address } from "./Address";
import { Img } from "./Img";

@Entity("profile")
export class Profile { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "email"}) 
    email: string;

    @Column({name: "mobile"}) 
    mobile: string;
    
    @Column({name: "aadhar"}) 
    aadhar: string;

    @Column({name: "password"}) 
    password: string;
    
    @Column({name: "role"}) 
    role: string;
    
    @Column({name: "active"}) 
    active: boolean;
    
    @Column({name: "token"}) 
    token: string;

    @Column({name: "grpcode"}) 
    grpcode: string;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
    @JoinColumn({name: "address_id"})
    @ManyToOne(type => Address)
    address: Address;
    
    @JoinColumn({name: "img_id"})
    @ManyToOne(type => Img)
    img: Img;

    @JoinColumn({name: "branch_id"})
    @ManyToOne(type => Branch)
    branch: Branch;

}

