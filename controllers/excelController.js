const jwt = require('jsonwebtoken');
// const config = require('./../config');
const rp = require('request-promise');

const apiCall= async(meetid,userData)=>{
    for(const user of userData){

        const payload = {
            iss: process.env.APIKEY,
            exp: ((new Date()).getTime() + 2000)
        };
        const token = jwt.sign(payload, process.env.APISECRET);


        var options = {
            uri: "https://api.zoom.us/v2/meetings/"+meetid+"/registrants", 
            auth: {
                'bearer': token
            },
            headers: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            body:{
                "email": user.email,
                "first_name": user.first_name + ' ',
                "last_name": user.last_name
            },
            json: true,
            method: 'POST' 
        };
        
        await rp(options);
        
    }
}
   


exports.createZoomRegistrants = async(req,res,next)=>{
   try{
       await apiCall(req.params.id,req.body.data);
    // console.log(req.body.data);
      res.status(200).json({
          status: 'success',
          message:"Successfull Added"
      });
   } catch( err) {
    res.status(400).json({
        status: 'Error',
        message: err.message
    });
}
    
   
}

