
import doctorService from '../service/doctorSevice'


let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let respone = await doctorService.getTopDoctorHomeSevice(+limit)
        return res.status(200).json(respone)
        
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Err code from sever ...'
        })

        
    }
}
    let getAllDoctor = async(req, res) => {
        try {
            let respone = await doctorService.fetchAllDoctor();
            return res.status(200).json(respone)
            
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                message:'err from server ...'
            })
            
        }
        
    }
let createInforDoctor = async (req, res) => {
    try {
        let respone = await doctorService.createInforDoctorSecvice(req.body)
        return res.status(200).json(respone)
        
    } catch (e) {
         console.log(e)
            return res.status(200).json({
                errCode: -1,
                message:'err from server ...'
            })
            
        
    }
        
}
//get detail infordoctor
let getDetailInforDoctor = async (req, res) => {
    try {
        let respone = await doctorService.getDetailInforDoctorSecvice(req.query.id)
        return res.status(200).json(respone)
        
    } catch (e) {
         console.log(e)
            return res.status(200).json({
                errCode: -1,
                message:'err from server ...'
            })
            
        
    }
        
}
    


module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    createInforDoctor: createInforDoctor,
    getDetailInforDoctor:getDetailInforDoctor,
}