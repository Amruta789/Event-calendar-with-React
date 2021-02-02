const express = require('express');
const router = express.Router();
const User = require('../database/users');

// Sign in an existing user 
router.post('/signin',async(req, res)=>{
    try{
        const { username, password } = await req.body;
        // If username and password are not blank,
        if(username!=="" && password!==""){
            // find user by username.
            const user = await User.findOne({username}).exec();
            if(user){
                // Compare password entered with password in database 
                user.comparePassword(password, (error, match) => {
                    if(error) throw error;
                    if(!match) {
                      res.json({
                          success: false, 
                          err: "Incorrect password"
                        });
                    }else{        
                        res.status(200).json({ 
                            success: true,
                            result: {
                                username: user.username,
                            },
                            message: "User login successful"  
                        })
                    }
                });
            }else{
                res.json({
                    success: false,
                    err: "User not found"
                })
            }
        }else{
            res.json({
                success:false,
                err: "Username or password not entered"
            })  
        }
    }catch(error){
        console.log(error);
    }
})

// Sign up a new user
router.post('/signup',async(req, res)=>{
    try{
        const { username, password } = await req.body;
        // If username and password are not blank,
        if(username!=="" && password!==""){
            // find user by username entered
            let user = await User.findOne({username}).exec();
            if(user){
                res.json({
                    success: false,
                    err: "User already exists"
                })
            }
            // If user does not exist, you can register
            else{
                user = new User({
                    username: username,
                    password: password
                })
                await user.save();
                res.json({
                    success: true,
                    result: {
                        username: user.username
                    },
                    message: "User registered successfully"
                })                
            }
        }else{
            res.json({
                success:false,
                err: "Username or password not entered"
            })  
        }
    }catch(error){
        console.log(error);
    }
})


module.exports=router;