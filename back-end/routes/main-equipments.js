const express = require('express');
const router = express.Router();
const mainEquipments = require('../controllers/main-equipments');
const checkAuth = require("../middlewares/check-auth");

router.post('/addEquipment', checkAuth, mainEquipments.saveProject);
router.put('/editEquipment/:id', checkAuth, mainEquipments.editProject);
router.delete('/deleteAll', checkAuth, mainEquipments.deleteAllProject);
router.delete('/deleteEquipment/:id', checkAuth, mainEquipments.deleteProject);
router.get('/getAllEquipments', mainEquipments.getAllProject);
router.get('/getOneEquipment/:id', mainEquipments.getOneProject);

module.exports = router;