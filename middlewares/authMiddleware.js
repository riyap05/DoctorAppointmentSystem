const JWT = require('jsonwebtoken')


//token hota hai request ke header mai

module.exports = async (req,res,next) => {
    try
    {
    const token = req.header('authorization').split(" ")[1]
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>
    {
        if(err)
        {
            return res.status(200).send({
                message:"Authentication Failed",
                success: false
            });
        }
        else
        {
            req.body.userId = decode.id
            next()
        }
    });
}
        catch(error)
        {
            //console.log(error)
            res.status(401).send(
                {
                    message: 'Authentication failed',
                    success: false,
                })  
        }
};