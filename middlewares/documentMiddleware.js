let document = require('../models/documentModel');

const createRecord =(data) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let newRecord = await document.create({
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
            let allRecords = await document.find(filterQuery, projectQuery);
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
            let record = await document.findOne(filterQuery, projectQuery);
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
            let record = await document.updateOne(filterQuery, updateObj);
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
            let record = await document.updateMany(filterQuery, updateObj);
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