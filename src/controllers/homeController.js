


import db from "../models/index"
import CRUDservice from "../service/CRUDservice"
let getHomepage= async(req,res)=>
{
    try
    {
        let data = await db.User.findAll();
        console.log(data)
        return res.render('homePage.ejs',{
            data : JSON.stringify(data)
        })

    }
    catch(e)
    {
     console.log(e);
    }
   

}
let getCRUD =( req, res)=>
{
    return res.render('crud.ejs');

}
let  postCRUD=async(req ,res) =>
{
   let message = await CRUDservice.createNewuser(req.body);
   console.log(message);   
    return res.send('post crud ');


}
let displayGetCRUD=async(req,res)=>
{
    let data = await CRUDservice.getAllUser();
    return res.render('get_displayCRUD.ejs',{ dataTable:data});

}
let getEditCRUD = async(req,res)=>{
    //lay id 
    let userID = req.query.id;
    if (userID){
        let userData= await CRUDservice.getUserInforByID(userID);
        console.log(userData);
        return res.render('edit-CRUD.ejs',{
            userData:userData,
        });
    }
    else{
        return res.send("User not found !");
    }
    

    
}
let  putCRUD = async(req,res)=>
{
    let data =req.body;
   let allUsers= await CRUDservice.updateUserData(data);
    return res.render('get_displayCRUD.ejs',{ dataTable:allUsers});

}
let deleteCRUD = async(req,res)=>
{
    let id = req.query.id;
    if (id)
    {
        await CRUDservice.deleteUserById(id);
    return res.send('deleted')
    }
    else{
        return res.send('user not found')
    }


}



module.exports= 
{
    getHomepage:getHomepage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
   

}
