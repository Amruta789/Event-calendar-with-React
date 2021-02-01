const express = require('express');
const router = express.Router();
const User = require('../database/users');

router.get('/',async(req, res)=>{
    res.send('HELLO FROM THE OTHER SIIIIIIDE!!!');
})

router.post('/signin',async(req, res)=>{
    try{
        const { username, password } = await req.body;
        if(username!=="" && password!==""){
            const user = await User.findOne({username}).exec();
            if(user){
                user.comparePassword(password, (error, match) => {
                    if(error) throw error;
                    if(!match) {
                      res.json({success: false, err: "Incorrect password"});
                    }else{        
                        res.status(200).json({ 
                            success: true,
                            result: {
                                username: user.username,
                            }  
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
        // res.json({
        //     success:false,
        //     err: error
        // })
    }
})

router.post('/signup',async(req, res)=>{
    try{
        const { username, password } = await req.body;
        if(username!=="" && password!==""){
            let user = await User.findOne({username}).exec();
            if(user){
                res.json({
                    success: false,
                    err: "User already exists"
                })
            }else{
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
        // res.json({
        //     success:false,
        //     err: error
        // })
    }
})


module.exports=router;