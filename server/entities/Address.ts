import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

@Entity("address")
export class Address { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "lane"}) 
    lane: string;

    @Column({name: "city"}) 
    city: string;

    @Column({name: "state"}) 
    state: string;

    @Column({name: "country"}) 
    country: string;

    @Column({name: "zipcode"}) 
    zipcode: number;
 
}

