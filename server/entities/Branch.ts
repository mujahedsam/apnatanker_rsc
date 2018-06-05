import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

@Entity("branch")
export class Branch { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "email"}) 
    email: string;

    @Column({name: "mobile"}) 
    mobile: string;

    @Column({name: "phone"}) 
    phone: string;

    @Column({name: "pan"}) 
    pan: string;

    @Column({name: "tan"}) 
    tan: string;

    @Column({name: "gstin"}) 
    gstin: string;

    @Column({name: "lat"}) 
    lat: string;
    
    @Column({name: "lng"}) 
    lng: string;

    @Column({name: "address"}) 
    address: string;

    @Column({name: "city"}) 
    city: string;

    @Column({name: "state"}) 
    state: string;

    @Column({name: "country"}) 
    country: string;

    @Column({name: "zipcode"}) 
    zipcode: number;

    @Column({name: "is_main"}) 
    isMain: boolean;
    
    @Column({name: "grpcode"}) 
    grpcode:string;
    
    @Column({name: "active"}) 
    active: boolean;

    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 

}

