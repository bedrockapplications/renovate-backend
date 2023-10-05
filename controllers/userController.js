const userMiddleware = require("../middlewares/userMiddleware");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const shortid = require("shortid");
// const SALT = 7;
const SALT = parseInt(process.env.SALT);

const userRegister = async (req, res, next) =>{
    try{
        let {fullName,email,password,phoneNumber,organizationName,} = req.body;
        if (!fullName||!email||!password||!phoneNumber||!organizationName) throw({message: "Required fields are missing" });
        let filterQuery = {email};
        let projectQuery = {};
        let userExist = await userMiddleware.getSingleRecord({filterQuery,projectQuery});
        if(userExist.status&&userExist.data) throw({message: "User Already Registered" });
        const salt = await bcrypt.genSalt(SALT);
        password = await bcrypt.hash(password, salt);
        userMiddleware.createRecord({fullName,email,password,phoneNumber,organizationName, role:"owner"}).then((data) => {
            res.json(data);
          })
          .catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
          });
    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const userContractorRegister = async (req, res, next) =>{
    try{
        let {fullName,email,password,phoneNumber,organizationName,} = req.body;
        if (!fullName||!email||!password||!phoneNumber||!organizationName) throw({message: "Required fields are missing" });
        let filterQuery = {email};
        let projectQuery = {};
        let userExist = await userMiddleware.getSingleRecord({filterQuery,projectQuery});
        if(userExist.status&&userExist.data) throw({message: "User Already Registered" });
        const salt = await bcrypt.genSalt(SALT);
        password = await bcrypt.hash(password, salt);
        userMiddleware.createRecord({fullName,email,password,phoneNumber,organizationName, role:"contractor"}).then((data) => {
            res.json(data);
          })
          .catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
          });
    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const userRegisterContractor = async(req, res, next) =>{
    try{
        // need to fetch the owner IDfrom token
        let {fullName,email,password,phoneNumber,organizationName} = req.body;
        if (!fullName||!email||!password||!phoneNumber||!organizationName) throw({message: "Required fields are missing" });
        let filterQuery = {email};
        let projectQuery = {};
        let userExist = await userMiddleware.getSingleRecord({filterQuery,projectQuery});
        if(userExist.status && userExist.data) throw({message: "User Already Registered" });
        const salt = await bcrypt.genSalt(SALT);
        password = await bcrypt.hash(password, salt);
        let ownerId=req.user._id//TODO fetch from token
        userMiddleware.createRecord({fullName,email,password,phoneNumber,organizationName, role:"contractor", ownerId}).then((data) => {
            res.json(data);
          })
          .catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
          });
    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const userLogin = async(req, res, next) =>{
    try{
        let {email, password}= req.body;
        let filterQuery = {email,status:"active"};
        let projectQuery = {};
        let userExist = await userMiddleware.getSingleRecord({filterQuery,projectQuery});
        if(userExist.status && userExist.data){
            let validPassword = await bcrypt.compare(password, userExist.data.password);
            if(!validPassword) throw({message:"Invaild User Input"});
            let token = jwt.sign({ user_id:userExist.data._id, email:userExist.data.email,role:userExist.data.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            let data = {
                token: token,
                email:userExist.data.email,
                role:userExist.data.role,
                user_id:userExist.data._id,
                updateDetail:userExist.data.updateDetail,
                resetPassword:userExist.data.resetPassword
            }
            res.json({status:true ,data});
        }else{
            throw({message:"Invaild User Input"});
        }

    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const userResetPassword = async(req, res, next) =>{
    try{
        let {email, oldPassword, newPassword} = req.body;
        let filterQuery = {email};
        let projectQuery = {};
        let userExist = await userMiddleware.getSingleRecord({filterQuery,projectQuery});
        let validPassword = await bcrypt.compare(oldPassword, userExist.data.password);
        if(!validPassword) throw({message:"Invaild User Input"});
        const salt = await bcrypt.genSalt(SALT);
        newPassword = await bcrypt.hash(newPassword, salt);
        let updateObj ={
            password:newPassword,
            resetPassword:false
        }
            
        userMiddleware.updateRecord({filterQuery, updateObj}).then(data=>{
            res.json({ status: true, message: "successfully Updated the password" });

        }).catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
          });

    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const userForgotPassword = async(req, res, next) =>{
    try{
        let {email} = req.body;
        let filterQuery = {email, status:"active"};
        let projectQuery = {};
        let userExist = await userMiddleware.getSingleRecord({filterQuery,projectQuery});
        if(userExist.status && userExist.data){
            let temp_password = shortid.generate();
            // TODO need to send the generated password
            console.log("temp_password----", temp_password);
            const salt = await bcrypt.genSalt(SALT);
            temp_password = await bcrypt.hash(temp_password, salt);
            let updateObj ={
                password:temp_password,
                resetPassword:true,
            }    
            userMiddleware.updateRecord({filterQuery, updateObj}).then(data=>{
                res.json({ status: true, message: "successfully Updated the password" });
    
            }).catch((err) => {
                console.log("err===", err);
                res.json({ status: false, message: err.message });
            });
        }else{
            throw({message:"Invaild User Email"});
        }

    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const getUserDetails = async (req, res, next) =>{
    try{
        let {_id, email, status}= req.query;
        let filterQuery = {status:"active"};
        if(!_id && !email) 
            throw({message:"Required field is missing"});
        if(_id) filterQuery._id = _id;
        if(email) filterQuery.email = email;
        if(status) filterQuery.status = status;

        let projectQuery = {
            password:0,
            ownerId:0,
            securityQuestions:0
        };
        let userExist = await userMiddleware.getSingleRecord({filterQuery,projectQuery});
        if(userExist.status && userExist.data){
            res.json(userExist);
        }else{
            throw({message:"Invaild User Input or the User is status in active"});
        }

    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

module.exports = {
    userRegister,
    userContractorRegister,
    userRegisterContractor,
    userLogin,
    userResetPassword,
    userForgotPassword,
    getUserDetails,
  };
  