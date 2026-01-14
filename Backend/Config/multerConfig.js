let multer=require('multer');

let  storage=multer.memoryStorage();

let LimitSize=1024*1024*5; //5MB,

let FileFilter=(req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
        cb(null,true);
    }else{
        cb(new Error("Only PDF files are allowed"),false);
    }
}


let upload=multer({
    storage,
    LimitSize,
    fileFilter:FileFilter    
});

module.exports=upload;