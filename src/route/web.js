import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/',homeController.getHomepage);
    router.get('/crud',homeController.getCRUD);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);
    router.post('/api/login',userController.handelLogin);
    router.get('/api/get-all-users',userController.handelGetAllUsers);
    router.post('/api/create-new-users',userController.handeltCreateNewUsers);
    router.put('/api/edit-users',userController.handeltEditUsers);
    router.delete('/api/delete-users', userController.handelDeleteUsers);
    router.get('/api/get-all-codes', userController.GetAllcoddes);
    router.get('/api/get-top-doctor', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctor);
    router.post('/api/create-infor-doctor', doctorController.createInforDoctor);
    router.get('/api/get-detail-infor-doctor', doctorController.getDetailInforDoctor);
    
     
  
  
    return app.use("/", router);
}

module.exports = initWebRoutes;