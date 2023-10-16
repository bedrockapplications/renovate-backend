const userMiddleware = require("../middlewares/userMiddleware");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const shortid = require("shortid");
// const SALT = 7;
const SALT = parseInt(process.env.SALT);
const sqMiddleware = require("../middlewares/securityQuestionMiddleware");

const { sendEmail } = require("../services/emailService");

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
            // TODO need to send the generated password-Done
            sendEmail("forgot_password", { email: userExist.data.email, temp_password });
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
            throw({message:"Invaild User Input or the User is status in-active"});
        }

    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const updateUserDetails = async (req, res, next) => {
  try {
    let user_id = req.user._id;
    // phoneNumber
    // fullName
    let filterQuery = { _id: user_id };
    let updateObj = {};
    let {
      phoneNumber,
      fullName,
      companyName,
      companyPhNumber,
      companycurrentAddress,
      emergencyContact,
      // street,
      // city,
      // state,
      // zipcode,
      // country,
      // fullName,
      // contactNum,
      // relationship,
    } = req.body;
    let userDetail = await userMiddleware.getSingleRecord({
      filterQuery,
      projectQuery: {},
    });
    if (userDetail.data.updateDetail == false) {
      let { street, city, state, zipcode, country } = companycurrentAddress;
      if (
        companyName &&
        companyName !== "" &&
        companyPhNumber &&
        companyPhNumber !== "" &&
        street &&
        street !== "" &&
        city &&
        city !== "" &&
        state &&
        state !== "" &&
        zipcode &&
        zipcode !== "" &&
        country &&
        country !== "" &&
        emergencyContact.fullName &&
        emergencyContact.fullName !== "" &&
        emergencyContact.contactNum &&
        emergencyContact.contactNum !== "" &&
        emergencyContact.relationship &&
        emergencyContact.relationship !== ""
      )
        updateObj.updateDetail = true;
    }
    // do some validation
    // if()
    // companyName
    // companyPhNumber
    // companycurrentAddress: {
    //     street
    //     city
    //     state
    //     zipcode
    //     country
    // },
    // emergencyContact: {
    //     fullName
    //     contactNum
    //     relationship
    //     }
    updateObj.companyInformation={};
    if (phoneNumber && phoneNumber !== "" && phoneNumber !== undefined)
      updateObj.phoneNumber = phoneNumber;
    if (fullName && fullName !== "" && fullName !== undefined)
      updateObj.fullName = fullName;

    if (companyName && companyName !== "") 
        updateObj.companyInformation.companyName = companyName;
    if (companyPhNumber && companyPhNumber !== "")
      updateObj.companyInformation.companyPhNumber = companyPhNumber;
    // Company address obj
    let companycurrentAddressObj = {};
    companycurrentAddressObj = userDetail.data.companycurrentAddress;
    if (street && street !== "") {
      companycurrentAddressObj.street = street;
      updateObj.companyInformation.companycurrentAddress = companycurrentAddressObj;
    }
    if (city && city !== "") {
      companycurrentAddressObj.city = city;
      updateObj.companyInformation.companycurrentAddress = companycurrentAddressObj;
    }
    if (city && city !== "") {
      companycurrentAddressObj.city = city;
      updateObj.companyInformation.companycurrentAddress = companycurrentAddressObj;
    }
    if (state && state !== "") {
      companycurrentAddressObj.state = state;
      updateObj.companyInformation.companycurrentAddress = companycurrentAddressObj;
    }
    if (zipcode && zipcode !== "") {
      companycurrentAddressObj.zipcode = zipcode;
      updateObj.companyInformation.companycurrentAddress = companycurrentAddressObj;
    }
    if (country && country !== "") {
      companycurrentAddressObj.country = country;
      updateObj.companyInformation.companycurrentAddress = companycurrentAddressObj;
    }
    // emergency contact obj
    let emergencyContactObj = {};
    emergencyContactObj = userDetail.data.emergencyContact;
    if (emergencyContact.fullName && emergencyContact.fullName !== "") {
      emergencyContactObj.fullName = emergencyContact.fullName;
      updateObj.companyInformation.emergencyContact = emergencyContactObj;
    }
    if (emergencyContact.contactNum && emergencyContact.contactNum !== "") {
      emergencyContactObj.contactNum = emergencyContact.contactNum;
      updateObj.companyInformation.emergencyContact = emergencyContactObj;
    }
    if (emergencyContact.relationship && emergencyContact.relationship !== "") {
      emergencyContactObj.relationship = emergencyContact.relationship;
      updateObj.companyInformation.emergencyContact = emergencyContactObj;
    }
    userMiddleware
      .updateRecord({ filterQuery, updateObj })
      .then((data) => {
        res.json({ status: true, message: "successfully Updated the Details" });
      })
      .catch((err) => {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
      });
  } catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
};

const updateUserPic = async(req, res, next) =>{
    try{
        let user_id = req.user._id;
        if(!req.files[0]) throw ({ message: "Counldnot find the Image" });
        let updateObj ={
            profilePic:req.files[0].location
        };
        userMiddleware.updateRecord({filterQuery:{_id:user_id}, updateObj}).then(data=>{
            res.json({ status: true, message: "successfully Updated the Profile Picture" });
        }).catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
        });
    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const editServicesProvided = async (req, res, next) => {
  try {
    let user_id = req.user._id;
    let filterQuery = { _id: user_id };
    let updateObj = {};
    if (req.body.servicesProvided) {
      if (Array.isArray(req.body.servicesProvided)){
          if (req.body.servicesProvided.length == 0) throw({message: "atleast One Service needs to be provided" });
          updateObj.servicesProvided = req.body.servicesProvided;
      }
        else updateObj.servicesProvided = [req.body.servicesProvided];
      userMiddleware
        .updateRecord({ filterQuery, updateObj })
        .then((data) => {
          res.json({
            status: true,
            message: "successfully Updated the Details",
          });
        })
        .catch((err) => {
          console.log("err===", err);
          res.json({ status: false, message: err.message });
        });
    }
  } catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
};

const editUserSecurity = async (req, res, next) =>{
    try{
        let user_id = req.user._id;
        let {questionId, answer} = req.body;
        if(!questionId||!answer)  throw({message: "Required field Missing" });
        let quetionDetails = await sqMiddleware.getSingleRecord({ filterQuery:{_id:questionId, status:"active"}, projectQuery:{} });
        if(!quetionDetails.status || !quetionDetails.data) throw({message: "Invalid Question ID" });
        let updateObj ={};
        updateObj.securityQuestions = {
            questionId,answer
        }
        userMiddleware.updateRecord({filterQuery:{_id:user_id}, updateObj}).then(data=>{
            res.json({ status: true, message: "successfully Updated the Details" });
        }).catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
        });
    }catch(err){
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
}

const getallUser = (req, res, next) =>{
    let filterQuery = req.query;
  let projectQuery = {};
  if(req.query.status){
    filterQuery.status = req.query.status
  } else filterQuery.status ="active"
  userMiddleware
    .getAllRecords({ filterQuery, projectQuery })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
}

const getUserDetail = (req, res, next) =>{
    let filterQuery = {
        _id: req.user._id
    };
  let projectQuery = {};
  userMiddleware
    .getSingleRecord({ filterQuery, projectQuery })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
}
module.exports = {
    userRegister,
    userContractorRegister,
    userRegisterContractor,
    userLogin,
    userResetPassword,
    userForgotPassword,
    getUserDetails,
    updateUserDetails,
    editUserSecurity,
    getallUser, //testing
    getUserDetail,
    editServicesProvided,
    updateUserPic,
  };
  