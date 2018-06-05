
var should = require('chai').should;
var id = "support@digitallynctech.com";
var passwd = "1234";
var gcode = "DLTECH";
var providers = "email";
var expect = require('chai').expect;
supertest = require('supertest');
api = supertest('http://0.0.0.0:9000');

var token = null;

describe('****----- BRANCH --------******', function() {
    
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



      it('Getting ALL Branches', function(done)  {
        
            this.timeout(5000);
            api.post('/api/branch')
            .set({'Authorization':token}) 
            .send(
              {  }
              )
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err,res){
             if(err){
               console.log(err)
             }else{
             console.log(res.body.data);
             }
             done();

           });
           });

           it('Get Branch RECORD',function(done) {
            
                    this.timeout(5000);
            
                    api.get('/api/branch/JBJ5UEXQ')
            
                    .set({'Authorization':token}) 
            
                    .expect(200)
            
                       .end(function(err, res) {
                       if(err){
                            console.log(err);
                       }else{ 
                            console.log(res.body);
                       }
                       done();
                      });
                   });



           it('Creating(or)Update  Branch', function(done)  {
            
                this.timeout(8000);
                api.put('/api/branch')
                .set({'Authorization':token}) 
                .send(
                    {
                        "data": {
                          "id": "JBJ5UEXQ",
                          "name": "brahkje",
                          "phone": "80000",
                          "mobile": "80080",
                          "email": "abc@gmail.com",
                          "pan": "",
                          "tan": "",
                          "gstin": "",
                          "lat": "1",
                          "lng": "1",
                          "city": "Hyderabad",
                          "state": "Andhara Pradesh",
                          "country": "India",
                          "zipcode": "50009",
                          "isMain": false
                        }
                    }
                 )
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err,res){
                 if(err){
                   console.log(err);
                 }else{
                 console.log(res.body);
                 }
                 done();
               });
               });
    
});
   