let projectBid = require('../models/projectContractorBidModel');

const createRecord =(data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let newRecord = await projectBid.create({
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
            let allRecords = await projectBid.find(filterQuery, projectQuery);
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
            let record = await projectBid.findOne(filterQuery, projectQuery);
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
            let record = await projectBid.updateOne(filterQuery, updateObj);
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
            let record = await projectBid.updateMany(filterQuery, updateObj);
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