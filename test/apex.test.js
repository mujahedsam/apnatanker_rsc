var should = require('chai').should;
var id = "support@digitallynctech.com";
var passwd = "1234";
var gcode = "DLTECH";
var providers = "email";
var expect = require('chai').expect;
supertest = require('supertest');
api = supertest('http://0.0.0.0:9000');

var token = null;

describe('****----- Apex Testing --------******', function() {
 
   it('jwt token Authentication',function(done) {
    this.timeout(5000);
    api.post('/api/auth')
       .send(
        {
          "data": {
            "userId": "support@digitallynctech.com",
            "password": "1234",
            "grpcode": "DLTECH",
            "provider": "email"
          }
        }
        )
        .end(function(err, res) {
          
          if(err){
            console.log(err);
          }else{
           token = res.body.data.jwt; 
           console.log(token);
          }
      //   .expect(200)
      //  .end(function(err, res) {
      //    token = res.body.data.jwt; 

      //    //console.log(res);
      //    console.log(token);
       done();
      });
   });


   it('Creating(or)Update  Record', function(done)  {
    
        this.timeout(8000);
        api.put('/api/apex')
        .set({'Authorization':token}) 
        .send(
            {
                "data": {
                    "name": "test",
                    "reportUrl": "reportUrl",
                    "apexReportDataList": [
                      {
                        "id": "0",
                        "name": "name",
                        "status": true
                      }
                    ]
                  }
              }
         )
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
         if(err){
           console.log(res.body.data);
         }else{
         console.log(res.body.data);
         }
         done();
       });
       });
       

       it('Get Particular Apex RECORD',function(done) {

        this.timeout(5000);

        api.get('/api/apex/JBNG0BHA')

        .set({'Authorization':token}) 

        .expect(200)

           .end(function(err, res) {
           if(err){
                console.log(res.body.data);
           }else{ 
                console.log(res.body.data);
           }
           done();
          });
       });
    
       it('Get ALL Records from apex', function(done)  {
        
            this.timeout(5000);
            api.post('/api/apex')
            .set({'Authorization':token}) 
            .send(
              {  }
              )
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err,res){
             if(err){
               console.log(res.body.data)
             }else{
             console.log(res.body.data);
             }
             done();

           });
           });
});