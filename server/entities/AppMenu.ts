import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";
 
@Entity("app_menu")
export class AppMenu { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "menu"}) 
    menu: string;

    @Column({name: "role"}) 
    role: string;

    @Column({name: "active"}) 
    active: boolean;

    @Column({name: "priority"}) 
    priority: number;
    
    @Column({name: "grpcode"}) 
    grpcode: string;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
  
}

