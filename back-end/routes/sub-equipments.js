const express = require('express');

const router = express.Router();
const subEquipments = require('../controllers/sub-equipment');

router.get('/addSubEquipment', subEquipments.addsubEquipment);
router.put('/editSubEquipment/:id', subEquipments.editSubEquipment);
router.delete('/deleteSubEquipment/:id', subEquipments.deleteSubEquiment);
router.get('/getAllSubEquip', subEquipments.getAllSub);
router.get('/getOneSub/:id', subEquipments.getOneSub);


module.exports = router;