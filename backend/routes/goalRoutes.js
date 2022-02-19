const express = require('express');
const { getGoals,postGoal,updateGoal,deleteGoal } = require('../controllers/goalsController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleWare');
router.route('/').get(protect,getGoals).post(protect,postGoal);
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal);

module.exports = router;