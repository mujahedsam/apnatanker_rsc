import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Profile } from './Profile';
import { Vehicle} from './Vehicle';
import { Habitations} from './Habitations';
import {ServiceCode} from './ServiceCode';


@Entity("user_vehicle")
export class UserVehicle { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "grpcode"}) 
    grpcode: string;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
    @JoinColumn({name: "profile_id"})
    @ManyToOne(type => Profile)
    profile: Profile;

    @JoinColumn({name: "vehicle_id"})
    @ManyToOne(type => Vehicle)
    vehicle: Vehicle;

    @JoinColumn({name: "service_code_id"})
    @ManyToOne(type => ServiceCode)
    serviceCode: ServiceCode;

    @JoinColumn({name: "habitations_id"})
    @ManyToOne(type => Habitations)
    habitations: Habitations;
}

