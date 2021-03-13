const express = require('express');
const router = express.Router();
const historiesEquipments = require('../controllers/history-sub-equipment');
router.get('/historiesList', historiesEquipments.getHistoriesEquipment);
router.get('/historiesList/:id', historiesEquipments.getHistoriesById);
router.post('/historiesList', historiesEquipments.addHistoriesEquipment);
router.delete('/historiesList', historiesEquipments.deleteHistoriesEquipment);



module.exports = router;