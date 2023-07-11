let question = require('../models/securityQuestionModel');

const createRecord =(data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let newRecord = await question.create({
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
            let allRecords = await question.find(filterQuery, projectQuery);
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
            let record = await question.findOne(filterQuery, projectQuery);
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

const updateRecord =(data) =>{
    return new Promise(async (resolve, reject)=>{   
        try{
            let {filterQuery, updateObj} = data;
            let updatedRecord = await question.updateOne(filterQuery, updateObj);
            resolve({
                status:true,
                data:updatedRecord
            })
        }catch(err){
            reject({
                status:false,
                message:err.message
            })
        }
    });
}

const updateRecordBulk =(data) =>{
    return new Promise(async (resolve, reject)=>{   
        try{
            let {filterQuery, updateObj} = data;
            let updatedRecord = await question.updateMany(filterQuery, updateObj);
            resolve({
                status:true,
                data:updatedRecord
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
    updateRecordBulk,
}