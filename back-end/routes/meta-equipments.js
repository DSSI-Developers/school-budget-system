const express = require('express');
const router = express.Router();
const metaController = require('../controllers/meta-equipments');
/*
    Metadata 
    -> Get metadata
    -> Add metadata
    -> Edit metadata
    -> Delete metadata
*/


router.get('/getMeta', metaController.getMetadata);
router.post('/addMeta', metaController.addMetadata);
router.put('/editMeta', metaController.editMetadata);
router.delete('/deleteMeta', metaController.deleteMetadata);


module.exports = router;