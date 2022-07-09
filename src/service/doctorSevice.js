

import db from '../models/index';



let getTopDoctorHomeSevice = (limitInput) => {
    return new Promise ( async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                where:{ roleId:'R2'},
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password'],
                    
                    
                }
                ,
                include:[{
                    model: db.Allcode,
                    as: 'positionData',
                    attributes: ['valueEn', 'valueVi']
                        
                },
                    {
                     model: db.Allcode,
                    as: 'genderData',
                    attributes: ['valueEn', 'valueVi']

                    }
                ]

                    
                ,
                raw: true,
                nest:true

            });
            resolve({
                errCode: 0,
                data:users
                
            })


            
        } catch (e) {
            reject(e);
            
        }

        
    })
}
let fetchAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
            where: {
                roleId:"R2"
            },attributes: {
                    exclude: ['password','Image'],
                    
                    
                }
        }
           
            
        )
        resolve({
            errCode: 0,
            data:doctor
        }

        )
        
       } catch (e) {
           reject(e)
        
       }
    })
}
let createInforDoctorSecvice = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
        
        if (!inputData.doctorId)
        {
            resolve({
                errCode: 1,
                message:'missing parameter'
            })
        }
        else {
            await db.markdown.create({
                contentHTML: inputData.contentHTML,
                description: inputData.description,
                contentMarkdown: inputData.contentMarkdown,
                doctorId:inputData.doctorId,
            })
            resolve({
                errCode: 0,
                message:'create succes infor'
            })
           
        }
    } catch (e) {
        reject(e)
        
    }
    })
    
    
}
  let getDetailInforDoctorSecvice = (inputId) => {
        return new Promise(async(resolve, reject) => {
            try {
                if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage:'missing require parameter',
                })
                    
                
                }
                else {
                    let data = await db.User.findOne({
                        where: { id: inputId },
                        attributes: {
                            exclude:['password']
                        }
                        ,
                        include: [{
                             model: db.markdown,
                       attributes: ['contentHTML', 'contentMarkdown','description']

                        },{model: db.Allcode,
                    as: 'positionData',
                    attributes: ['valueEn', 'valueVi']}],
                        raw: false,
                        nest:true
                        
                            
                        

                    })
                    if (data && data.Image) {
                        data.Image = new Buffer(data.Image, 'base64').toString('binary');
                    }
                    resolve({
                        errCode: 0,
                        data:data
                    })
                }
                
            } catch (e) {
                reject(e)
                
            }
        })
    }
module.exports = {
    getTopDoctorHomeSevice: getTopDoctorHomeSevice,
    fetchAllDoctor: fetchAllDoctor,
    createInforDoctorSecvice: createInforDoctorSecvice,
    getDetailInforDoctorSecvice:getDetailInforDoctorSecvice,
    
}