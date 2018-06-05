import {createConnection} from "typeorm";   
import {Constants} from "./Constants";

class DataAccess {
    constructor () {
        DataAccess.connect();
    }

    static connect (): any {
        createConnection().then(async connection => {
            console.log("connection created successfully");
        });
    }
}

DataAccess.connect();
export {DataAccess};
