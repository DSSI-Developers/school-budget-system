const express = require('express');

const router = express.Router();
const subEquipments = require('../controllers/sub-equipment');
const checkAuth = require("../middlewares/check-auth");
router.post('/addSubEquipment', checkAuth, subEquipments.addsubEquipment);
router.put('/editSubEquipment/:id', checkAuth, subEquipments.editSubEquipment);
router.get('/getAllSubEquip', subEquipments.getAllSub);
router.get('/getOneSub/:id', subEquipments.getOneSub);
router.get('/getSubId/:id', subEquipments.getMainSubEquipment);
router.delete('/deleteSubEquipment/:id', checkAuth, subEquipments.deleteSubEquiment);


module.exports = router;