let user = require('../models/userModel');

const createRecord =(data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            
            let newRecord = await user.create({
                ...data
            })
            resolve({
                status:true,
                data:newRecord
            })
        }catch(err){
            reject({
                status:false,
                message:err.message
            })
        }
    });
}

const getAllRecords =(query) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let {filterQuery, projectQuery} = query;
            let allRecords = await user.find(filterQuery, projectQuery).lean();
            resolve({
                status:true,
                data:allRecords
            })
        }catch(err){
            reject({
                status:false,
                message:err.message
            })
        }
    });
}

const getSingleRecord =(query) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let {filterQuery, projectQuery} = query;
            let record = await user.findOne(filterQuery, projectQuery).populate({path: 'securityQuestions.questionId', model: 'br_securityQuestion', select:'question'});
            resolve({
                status:true,
                data:record
            })
        }catch(err){
            reject({
                status:false,
                message:err.message
            })
        }
    });
}

const updateRecord =(query) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let {filterQuery, updateObj} = query;
            let record = await user.updateOne(filterQuery, updateObj);
            resolve({
                status:true,
                data:record
            })
        }catch(err){
            reject({
                status:false,
                message:err.message
            })
        }
    });
}

const updateRecordBulk =(query) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let {filterQuery, updateObj} = query;
            let record = await user.updateMany(filterQuery, updateObj);
            resolve({
                status:true,
                data:record
            })
        }catch(err){
            reject({
                status:false,
                message:err.message
            })
        }
    });
}


module.exports = {
    createRecord,
    getAllRecords,
    getSingleRecord,
    updateRecord,
    updateRecordBulk
}