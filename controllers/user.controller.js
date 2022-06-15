const { User } = require("../models");
const setResponse = require("../helper/response.helper");


class UserControllers {
  
static async update(req, res,next) {
    try {
     const user = await User.findOne({
        where: {
         id: req.user.id,
       },
     })

     if (!user) {
       throw {
         status: 404,
         message: 'User Not Found'
       }
     } else {
       req.body.verified= true
       const updatedUser= await User.update(req.body, {
         where: {
           id: req.user.id
         },returning:true
       })
       console.log(updatedUser,req.body,req.user)
       const response = setResponse('success', updatedUser[1][0], null)
       res.status(200).json(response)
     }
   } catch (err) {
     next(err)
   }   
 }
}
 module.exports = UserControllers