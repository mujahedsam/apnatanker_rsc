
var should = require('chai').should;
var id = "support@digitallynctech.com";
var passwd = "1234";
var gcode = "DLTECH";
var providers = "email";
var expect = require('chai').expect;
supertest = require('supertest');
api = supertest('http://0.0.0.0:9000');


 var token = null;

describe('****----- AUTH --------******', function() {
 
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
        //.expect(200)
       .end(function(err, res) {
        
        if(err){
          console.log(err);
        }else{
         token = res.body.data.jwt; 
         console.log(token);
       // console.log(res);
        }
        //  console.log(res);
       //  console.log (token);
       done();
      });
   }); 
   




  // it('it should get ALL consumer', function(done)  {
  //   this.timeout(5000);
  // api.post('/api/profile')
  // .set({'Authorization':token}) 
  // .expect(200)
  // .expect('Content-Type', /json/)
  // .end(function(err,res){
   
  //   //  var hari = res.text;
  //   //console.log(res);
  //   done();
  // });
  // });



  it('Auth for Forgot Passwprd', function(done)  {
    
        this.timeout(5000);
        api.put('/api/auth/forgotpassword')
       // .set({'Authorization':token}) 
        .send(
         {
          "data": {
            "email": "support@digitallynctech.com",
            "grpcode": "DLTECH"
          }
         }
         )
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err,res){
        if(err){
          console.log(err);
        }else{
          console.log(res.body.data);
        }
        
         done();
       });
       });

    
       it('Auth for Reset Passwprd', function(done)  {
        
            this.timeout(5000);
            api.post('/api/auth/resetpassword')
            .set({'Authorization':token}) 
            .send(
             {
              "data": {
                "email": "support@digitallynctech.com",
                "grpcode": "DLTECH"
              }
             }
             )
            .expect(404)
           // .expect('Content-Type', /json/)
            .end(function(err,res){
             if(err){
               console.log(err)
             }
             console.log();
             done();
           });
           });
  });

  