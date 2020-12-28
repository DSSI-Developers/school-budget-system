const express = require('express');
const router = express.Router();
const mainEquipments = require('../controllers/main-equipments');

router.post('/addEquipment', mainEquipments.saveProject);
router.put('/editEquipment/:id', mainEquipments.editProject);
router.delete('deleteAll', mainEquipments.deleteAllProject);
router.delete('/deleteEquipment/:id', mainEquipments.deleteProject);
router.get('/getAllEquipments', mainEquipments.getAllProject);
router.get('/getOneEquipment/:id', mainEquipments.getOneProject);


module.exports = router;