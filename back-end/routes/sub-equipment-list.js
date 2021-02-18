const express = require('express');
const router = express.Router();

const subEquipmentListRouter = require('../controllers/sub-equipment-list');

router.post('/subEquipmentList', subEquipmentListRouter.addList);
router.get('/subEquipmentList', subEquipmentListRouter.getList);
router.get('/subEquipmentList/:main', subEquipmentListRouter.getListByName);
module.exports = router;