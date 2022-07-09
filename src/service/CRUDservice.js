import bcrypt  from 'bcryptjs';
  import db from '../models/index';
 
const salt = bcrypt.genSaltSync(10);
let createNewuser =async(data)=>{
    return new  Promise( async(resolve,reject)=>{
        try{
            let hashPasswordFromBcryptjs= await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                 password:hashPasswordFromBcryptjs,
                 address: data.address,
                 gender:data.gender,
                roleId:data.roleId === '1' ? true: false,
                 phoneNumber:data.phoneNumber,
                 

            })
            resolve('ok create new user');

        
        }catch(e)
        {
             console.log(e); 
        }
    }) 
    
   

    console.log('data from service');
    console.log(data); 
    console.log(hashPasswordFromBcryptjs);
    

}
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
let getAllUser =()=>
{
    return new Promise(async( resolve,reject)=>{
        try {
            let users = await db.User.findAll({
                raw:true,
            });
            resolve(users);

        }
        catch(e)
        {
            reject(e);
        }

    })

}
let getUserInforByID =(userId) =>
{
    return new Promise( async(resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where :{ id : userId},
                raw:true
            })
            if (user){
                resolve(user);

            }
            else
            {
                resolve([]);

            }


        }
        catch(e)
        {
            reject(e);
        }
    })
}
let updateUserData=(data)=>
{
    return new Promise (async(resolve,reject)=>
    {
        try {
            let user =await db.User.findOne({
                where: { id: data.id}
            })
        
            if( user)
            {
                user.firstName=data.firstName ;
                user.lastName=data.lastName;
                user.address=data.address;
                await user.save();
                let allUsers =await db.User.findAll( {
                    raw:true,
                })
                resolve( allUsers);


            }

            else{
                resolve();

            }
        }
        catch(e)
        {
            console.log(e);
        }
    })
}
let deleteUserById= (userId)=>
{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await db.User.findOne(
                {
                    where: { id : userId }
                }
            )
            if (user)
            {
                 await user.destroy();
               
            }
             resolve();

        }
        catch(e)
        {
            reject(e);
        }

    })

}
module.exports={
    createNewuser:createNewuser,
    getAllUser:getAllUser,
    getUserInforByID:getUserInforByID,
    updateUserData:updateUserData,
    deleteUserById:deleteUserById,
}