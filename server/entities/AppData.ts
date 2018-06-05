import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

@Entity("app_data")
export class AppData { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "code"}) 
    code: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "active"}) 
    active: boolean;
    
    @Column({name: "grpcode"}) 
    grpcode: string;

    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
}

