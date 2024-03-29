const mongoose=require('mongoose');
const { schema }=mongoose;
const bcrypt=require('bcrypt')
const JWT=require('jsonwebtoken')

const userSchema=new schema({
    name:{
        type:string,
        require:[true,'Your name is required']
    },
    username:{
        type:string,
        require:[true,'username is required'],
        minLength:[5],
        maxlength:[12,"username length should not exceed 12 char's"]
    },
    bio:{
        type:string,
        require:[true,'write about yourself']
    },
    email:{
        type:string,
        require:[true]
    },
    password:{
        type:string,
        require:[true]
    }
})

    userSchema.pre('save',async function(next){
        if(!this.isModified('password')){
            return next();
        }
        this.password=await bcrypt.hash(this.password,10);
        this.next();
    })

    userSchema.methods={
        jwttoken(){
            return JWT.sign({
                id:this._id,
                username:this.username},
            process.env.secret,{
                expiresIn:'24h'
            }
            )
        }
    }
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;