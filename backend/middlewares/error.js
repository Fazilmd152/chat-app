export default (err,req,res,next)=>{
    err.statuscode =err.statuscode || 500

    res.status(err.statuscode).json({
        success:false,
        //error:err.errors.email.message,
        message:err.message,
        stack:err.stack,
        err
    })
}