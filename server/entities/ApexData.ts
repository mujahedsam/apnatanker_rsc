import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";
 

@Entity("apex_data")
export class ApexData { 
    @PrimaryColumn({name: "name"}) 
    name: string;

    @Column({name: "code"}) 
    code: string;

    @Column({name: "status"}) 
    status: boolean;
  
}

