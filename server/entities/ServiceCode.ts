import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";


@Entity("service_code")
export class ServiceCode { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "img_required"}) 
    imgRequired: boolean;

    @Column({name: "signature_required"}) 
    signatureRequired: boolean;

    @Column({name:"hide_route"})
    hideRoute: string;
    
    @Column({name: "active"}) 
    active: boolean;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
}

