const asyncHandler = require('express-async-handler');
const Goals = require('../model/goalModel');
// @desc    Get the goals
// @request GET /api/goals
// @access  Private
const getGoals = asyncHandler(async(req,res) => {
    const goal = await Goals.find();
    res.json({goal});
})
// @desc    Post the goal
// @request POST /api/goals
// @access  Private
const postGoal = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please enter the value text..')
    }
    const goal = await Goals.create({
        text:'My first goal',
    })
    res.json({goal});
})
// @desc    Update the goal
// @request PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async(req, res) => {

    const goal = await Goals.findById(req.params.id);
    if(!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    const updatedGoal = await Goals.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json({ updatedGoal});
});
// @desc    Delete the goals
// @request DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goals.findById(req.params.id);
    if(!goal) {
        res.status(400);
        throw new Error('Goal no found');
    }
    goal.remove();
    res.json({ id : req.params.id });
});

module.exports = { getGoals,postGoal,updateGoal,deleteGoal };
