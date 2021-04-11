const express = require('express');
const router = express.Router();
const setBudgetController = require('../controllers/set-budget-leader');
const checkAuth = require("../middlewares/check-auth");

router.post('/setbudget', checkAuth, setBudgetController.setbudget);
router.get('/setbudget', setBudgetController.getBudget);
router.put('/setbudget/:id', checkAuth, setBudgetController.editbudget);
router.delete('/setbudget/:id', setBudgetController.deletebudget);

module.exports = router;