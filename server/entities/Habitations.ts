import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

@Entity("habitations")
export class Habitations { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "state"}) 
    state: string;

    @Column({name: "district"}) 
    district: string;

    @Column({name: "mandal"}) 
    mandal: String;

    @Column({name: "panchayath"}) 
    panchayath: string;

    @Column({name: "habitation"}) 
    habitation: string;

    @Column({name: "village"}) 
    village: string;

    @Column({name: "total_population"}) 
    totalPopulation: string;

    @Column({name: "lat"}) 
    lat: string;

    @Column({name: "lng"}) 
    lng: string;
    
    @Column({name: "active"}) 
    active: boolean;

    @Column({name: "grpcode"}) 
    grpcode: string;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
}

