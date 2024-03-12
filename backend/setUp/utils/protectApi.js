const protectApi = (req, res, next) => {
    const authorization = req.header("Authorization");

    if(authorization) {
        //jwt tOken

        return next();
    }else {
        return res.status(403).json({
            message : "Unauthorized acesses denied !!"
        })
    }
}

export default  protectApi; 