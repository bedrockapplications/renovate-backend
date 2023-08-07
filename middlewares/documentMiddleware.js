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

const createRecordBulk =(dataArray) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            let newRecord = await document.insertMany(dataArray)
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
            let {userId,projectId,categoryType } = filterQuery;
            let fiterObj ={};
            if(userId)
            filterObj.userId=userId;
            if(projectId)
            filterObj.projectId=projectId;
            if(categoryType)
            filterObj.categoryType=categoryType;
            let allRecords = await document.find(fiterObj, projectQuery);
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

const getAllRecordsCustom =(query) =>{
    return new Promise(async (resolve, reject)=>{
        try{
            
            const pageNumber = parseInt(query.pageNumber) || 0;
            const limit = parseInt(query.limit) || 10;
            const uid = query.userId;
            const pid = query.projectId;
            let startIndex = pageNumber * limit;
            const endIndex = (pageNumber + 1) * limit;
            let dd = [];
            let st = [];
            let pt = [];
            let ddLength = 0;
            let stLength = 0;
            let ptLength = 0;
            let filterQuery = {};
            const result = {};
            filterQuery.status="active";
            if (uid !== "" && uid != undefined) {
              filterQuery.userId = uid;
            }
            if (pid !== "" && pid != undefined) {
              filterQuery.projectId = pid;
            }
            if (query.categoryType !== "" && query.categoryType != undefined) {
              filterQuery.categoryType = query.categoryType;
            }
            if (value != "" && value != undefined) {
              filterQuery.fileName = { $regex: new RegExp("^" + value, "i") };
            }
            let allRecords = await document.find(filterQuery, projectQuery).populate({
                path: "projectId",
                select: ["projectName"],
              })
              .sort({ updatedAt: -1 });
              allRecords.forEach((e) => {
                if (e.categoryType == "DesignDocuments") {
                    dd.push(e);
                    ddLength++;
                } else if (e.categoryType == "Submittals") {
                    st.push(e);
                    stLength++;
                } else if (e.categoryType == "Photos") {
                    pt.push(e);
                    ptLength++;
                }
              });
              result.DesignDocuments = dd.length > 0 ? dd.slice(startIndex, endIndex) : dd;
              result.Submittals = st.length > 0 ? st.slice(startIndex, endIndex) : st;
              result.Photos = pt.length > 0 ? pt.slice(startIndex, endIndex) : pt;
              result.DesignDocumentsCount = ddLength;
              result.SubmittalsCount = stLength;
              result.PhotosCount = ptLength;
              result.rowsPerPage = limit;
            resolve({
                status:true,
                data:result
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
    createRecordBulk,
    getAllRecords,
    getAllRecordsCustom,
    getSingleRecord,
    updateRecord,
    updateRecordBulk
}