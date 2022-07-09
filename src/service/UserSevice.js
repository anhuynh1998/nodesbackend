import db from "../models/index";
//has password 
import bcrypt from 'bcryptjs';
import { use } from "express/lib/application";
import res from "express/lib/response";


 const salt = bcrypt.genSaltSync(10);
 let hashUserPassword=(password)=>
{
    return new Promise( async(resolve,reject) =>
    {
        try{
            var hashPassword = await bcrypt.hashSync("password", salt);
            resolve(hashPassword);

        }catch(e){
            reject(e);

        }
       
        

    })
}
let handelUserLogin =(email,password)=>
{
    return new Promise( async(resolve,reject)=>
    {
        try{
            let userData ={};
            let iExist= await checkUserEmail(email);
        if  (iExist)
        {
            let user = await db.User.findOne({
                where: { email:email },
                attributes: ['email', 'password','roleID','firstName','lastName'],
                raw:true
                

            })
            if (user)
            {
                //compare password 
                let check= await bcrypt.compareSync("password", user.password); // true


                if (check)
                {
                    userData.errCode=0;
                    userData.errMessage='ok';
                    console.log(user);
                    delete user.password;
                    userData.user=user;
                    
                }
                else
                {
                    userData.errCode=3;
                    userData.errMessage='Wrong password';
                    
                
                }
            }
            else
            {
                userData.errCode=2;
                userData.errMessage='user not found';

            }
        }
        else
        {
            //return error 
            userData.errCode=1;
            userData.errMessage="email not exist . please try agains";
            
            
        }
        resolve(userData)

        }catch(e)
        {
            reject(e)
        }


    })

}

let checkUserEmail=(userEmail)=>
{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where :{ email:userEmail}
            })
            if ( user)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }

        }
        catch(e)
        {
            reject(e)
        }
    })
}
let getAllusers=(userId)=>
{
    return new Promise(async(resolve,reject)=>{
        try {
            let users='';
            if( userId==='ALL' )
            {
                 users= await db.User.findAll({
                     attributes: { exclude: ['password'] }
                 });
            }
            if(userId && userId!=='ALL')
            {
                users= await db.User.findOne(
                    {
                        where :{ id : userId },
                        attributes: { exclude: ['password'] }
                    }
                )
            }
            resolve(users)
            
        } catch (e) {
            reject(e)
            console.log(e)
            
        }

    })

}
let creatNewUsers=(data)=>
{
    return new Promise(async(resolve,reject)=>{

        try {
            //check email exist
            let check = await checkUserEmail(data.email);
            if ( check ===true )
            {
                resolve({
                    errCode:1,
                    errMessage:'Your email has been used',
                })

            }
            else{

             let hashPasswordFromBcryptjs= await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                 password:hashPasswordFromBcryptjs,
                 address: data.address,
                 gender:data.gender,
                 roleId:data.role,
                phoneNumber: data.phoneNumber,
                positionId: data.position,
                 Image:data.avatar
            })
            resolve({
                errCode:0,
                errMessage: 'ok'
            })

            }

                 


            
        } catch (e) {
            reject(e)
            
        }
    })

}
let updateUserData =(data)=>{
    return new Promise(async(resolve,reject)=>{


        try {
            if (!data.id)
            {
                resolve({
                    errCode: 1,
                    errMessage: "Missing  require parameter "
                })
            }
            let user =await db.User.findOne({
                where: { id: data.id
                }
                ,
                raw: false,
            })
        
            if( user)
            {
              
               user.firstName=data.firstName;
               user.lastName=data.lastName;
               user.address=data.address;
               await user.save();
                resolve({
                    errCode:0,
                    errMessage:'update the user success !'
                });


            }

            else{
                resolve({
                    errCode:1,
                    errMessage:' user not found'
                });

            }
        
            
        } catch (e) {
            reject(e)
            
        }
    })

}
let deleteUser = (userId)=>
{
    return new Promise(async(resolve,reject
    )=>{
        try {

            let user= await db.User.findOne({
                where : { id: userId}
            })
            if(!user)
            {
                resolve({
                    errCode:2,
                    errMessage:'the user is not exist'
                })
            }
            await db.User.destroy({
                where:{ id : userId}
            })
            
            resolve({
                errCode:0,
                errMessage:'user deleted'
            })
            
        } catch (e) {
            reject(e);
            
        }



    })
   

}
let getAllcode = (typeInput) =>
{
    return new Promise(async(resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage:'missing require parameter',
                })
                
            }
            else {
                 let res = {};
                 let allcode = await db.Allcode.findAll(
                {
                    where:{type:typeInput}
                }
            );
            res.errCode = 0;
            res.data = allcode;
            resolve(res);
                
            }
           

            
            
        } catch (e) {
        reject(e)
            
        }
        
    })

    
}
  
module.exports={
    handelUserLogin:handelUserLogin,
    getAllusers:getAllusers,
    creatNewUsers:creatNewUsers,
    deleteUser:deleteUser,
    updateUserData: updateUserData,
    getAllcode: getAllcode,
   
    

}