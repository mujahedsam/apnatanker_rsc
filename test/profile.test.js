var should = require('chai').should;
var id = "support@digitallynctech.com";
var passwd = "1234";
var gcode = "DLTECH";
var providers = "email";
var expect = require('chai').expect;
supertest = require('supertest');
api = supertest('http://0.0.0.0:9000');

var token = null;

describe('****----- PROFILE --------******', function() {
 
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
        api.put('/api/profile')
        .set({'Authorization':token}) 
        .send(
            {
                "data": {
                  "id": "",
                  "name": "abcgfhgjhdfds",
                  "mobile": "80080",
                  "email": "abfsdhfcgac@gmail.com",
                  "aadhar": "148679533456781234",
                  "password": "1234",
                  "role": "USER",
                  "active": "true",
                  "address": {
                    "id": "",
                    "lane": "1234",
                    "street": "abcd",
                    "city": "Hyderabad",
                    "state": "Telangana",
                    "country": "India",
                    "zipcode": "500089"
                  },
                  "img": {
                    "id": null
                  },
                  "branch": {
                    "id": "DL_MAIN_BRANCH"
                  }
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
       

       it('Get User RECORD',function(done) {

        this.timeout(5000);

        api.get('/api/profile/JAXX3POU')

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
    
       it('Get ALL Records', function(done)  {
        
            this.timeout(5000);
            api.post('/api/profile')
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
             console.log(res.body);
             }
             done();

           });
           });
});