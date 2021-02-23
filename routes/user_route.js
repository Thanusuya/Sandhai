const express = require('express')
const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const router = express.Router()


router.post('/Register',(req,res)=>{
    User.findOne({phonenumber:req.body.phonenumber},(err,user)=>{
        if(err){
            console.log(err)
            res.json(err)
        }else{
            if(user==null){
                const user = User({
                    name:req.body.name,
                    phonenumber:req.body.phonenumber,
                    password:req.body.password,
                    email:req.body.email,
                    address:req.body.address,
                    state:req.body.state

                })
                user.save()
                .then((err)=>{
                    if(err){
                        console.log(err)
                        res.json(err)
                    }else{
                        console.log(user)
                        res.json(user)
                    }
                    
                })
            }else{

            res.json({
                message:'number is already avilable'

            })  
             
            }
        }
    })
    
})

router.post('/Login',(req,res,next)=>{
    //console.log(req.body.phonenumber),
    //console.log(req.body.password),
    User.findOne({ phonenumber: req.body.phonenumber })
    .exec(function (err, user) {
     /* if (err) {
        //return callback(err)
      } else if (!user) {
        var err = new Error('User not found!');
        err.status = 401;
       // return callback(err);
      } else {
          console.log("msg:Password verification"+password)
      bcrypt.compare(password , user.password, function (err, result) {
        if (result == true) {
         // return callback(null, user);
        } else {
          //return callback('Wrong password!');
      }*/
      //const passcheck=bcrypt.compareSync(req.body.password,user.password)
      var status=false
     var encryptpassword; bcrypt.hash(req.body.password, 10, function(err, hash) {
        encryptpassword=hash
    });
      console.log("msg:Password verification"+user.password)
      const passmatch=bcrypt.compare(req.body.password,user.password).then(function(result){
          if(result)
          {status=true}
      })
      console.log(status)
     // bcrypt.compare(password , user.password, function (err, result) {
       // if (result == true) {
         // return callback(null, user);
        //} else {
          //return callback('Wrong password!');
      //}
  
    if (req.body.phonenumber && req.body.password) {
        /*User.authenticate(req.body.phonenumber, req.body.password, function (error, user) {
          if (error || !user) {
            error.status = 401;
            return next(error);
          } else {
          //res.send(user);
          res.json({
            message:'server error'

        })  
        
          }
        });*/
      } else {
        var err = new Error('Something went wrong!');
        err.status = 400;
        return next(err);
      }
    })
})  
module.exports = router
