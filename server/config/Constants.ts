class Constants {
    
    //static DB_CONNECTION_STRING: string  = "mongodb://localhost/education"; 
    static DB_CONNECTION_STRING: string  = "mongodb://admin:Test!234@cluster0-shard-00-00-cisi2.mongodb.net:27017,cluster0-shard-00-01-cisi2.mongodb.net:27017,cluster0-shard-00-02-cisi2.mongodb.net:27017/education?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
}
Object.seal(Constants);

export { Constants };

