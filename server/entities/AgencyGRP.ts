import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";
 

@Entity("agency_grp")
export class AgencyGRP { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "title"}) 
    title: string;

    @Column({name: "logo"}) 
    logo: string;

    @Column({name: "status"}) 
    status: boolean;
  
}

