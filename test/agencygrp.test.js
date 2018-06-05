var should = require('chai').should;
var id = "support@digitallynctech.com";
var passwd = "1234";
var gcode = "DLTECH";
var providers = "email";
var expect = require('chai').expect;
supertest = require('supertest');
api = supertest('http://0.0.0.0:9000');

var token = null;

describe('****----- AGENCY GRP --------******', function() {
 
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
        api.put('/api/agencygrp')
        .set({'Authorization':token}) 
        .send(
            {
                "data": {
                    "id":null,
                  "name": "CMP0001",
                  "title": "Digital Lync",
                  "logo": null,
                  "status": true,
                  "branch": {
                    "name": "Gachibowli",
                    "phone": 8008080080,
                    "mobile": 8008080080,
                    "email": "abc@gmail.com",
                    "pan": "effpd5462n",
                    "tan": "",
                    "gstin": "",
                    "lat": 16.32153940,
                    "lng": 80.43401620,
                    "city": "Guntur",
                    "state": "Andhra Pradesh",
                    "country": "India",
                    "zipcode": "522647",
                    "isMain": true
                  },
                  "profile": {
                    "name": "abcd",
                    "mobile": "8008012345",
                    "email": "abc@gmail.com",
                    "aadhar": "123456781234",
                    "password": "1234",
                    "role": "admin",
                    "active": true,
                    "address": {
                      "id": "JB1TJWGS"
                    },
                    "branch": {
                      "id": "DL_MAIN_BRANCH"
                    },
                    "img": {
                      "id": "SUPPORT_DL"
                    }
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

        api.get('/api/agencygrp/DL')

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
            api.post('/api/agencygrp')
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