const userModel=require('../model/userSchema')
const bcrypt=require('bcrypt')

const signUp=async(req,res)=>{
    try{
        const newUser=await userModel.create(req.body);
        res.status(200).send({
            msg:"Signup Success"
        })
    }catch(err){
        res.status(400).send({msg:err.message})
    }
}

const login=async(req,res)=>{
    const {username, password}=req.body;
    try{
        const getUserData=await userModel.findOne({username}).select("+password");
        if(getUserData && getUserData.username){
            const result=await bcrypt.compare(password,getUserData.password)
            if(result){
                const token = await getUserData.jwtToken()
                const cookieOption={
                    maxAge:34*60*60*1000,
                    httpOnly:true
                };
                res.cookie("token",token,cookieOption);
                res.status(200).json({
                    success:true,
                    data:getUserData
                }); 
            }else{
                res.status(400).send({msg:"password is incorrect, try again"})
            }
        }else{
            res.status(400).send({msg:"no account found with this username"})
        }
    }catch(err){res.status(400).send({msg:err.message})}
}

    const getUserDetails=async(req,res)=>{
        const { id,username }=req.user
        try{
            const userData=await userModel.findOne({username});
            res.status.send({
                success:true,
                data:userData
            })
        }catch(err){
            res.status(501).send({msg:err.message})
        }
    }
module.exports={
    signUp,
    login,
    getUserDetails
};