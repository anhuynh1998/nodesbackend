import UserService from "../service/UserSevice";

let handelLogin = async ( req,res) =>
{
    
    let email = req.body.email;
    let password= req.body.password;
    
    //check email exist
    //compare password
    //return userinfor
    //accesstoken :jwt 
    if(!email ||!password)
    {
        return res.status(500).json(
            {
                errcode:1,
                message:"missing input ",
            }
        )
    }
     let userData = await UserService.handelUserLogin(email,password);
  
    

    return res.status(200).json({
       errcode: userData.errCode,
       message: userData.errMessage,
       user:userData.user ? userData.user:{}
    })

}
let handelGetAllUsers= async(req,res)=>
{
    let id = req.query.id;//All or id
    let users = await UserService.getAllusers(id);
    if(!id)
    {
    return res.status(200).json({
        errCode:0,
        errMessage:'Missing  required parameters',
        users :[]
    })

    }
    return res.status(200).json({
        errCode:0,
        errMessage:'ok',
        users 
    })

}
let handeltCreateNewUsers = async(req,res)=>
{
    let message = await UserService.creatNewUsers(req.body);
    return res.status(200).json(message)


}
let handeltEditUsers= async(req,res)=>
{
    let data=req.body
    let message = await UserService.updateUserData(data)
    return res.status(200).json(message);

}
let handelDeleteUsers = async (req,res)=>
{
    if(!req.body.id)
    {
        return res.status(200).json({
            errCode:1,
            errMessage:' missing  require parameters'
        })
    }
    let message= await UserService.deleteUser(req.body.id)
    return res.status(200).json(message)


}
let GetAllcoddes = async (req, res) => {
    try {
        let data = await UserService.getAllcode(req.query.type);
        return res.status(200).json(data)
        
        
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'err from sever',
            
        })
        
    }
    
}
module.exports={
    handelLogin:handelLogin,
    handelGetAllUsers:handelGetAllUsers,
    handeltCreateNewUsers:handeltCreateNewUsers,
    handeltEditUsers:handeltEditUsers,
    handelDeleteUsers: handelDeleteUsers,
    GetAllcoddes:GetAllcoddes,

}