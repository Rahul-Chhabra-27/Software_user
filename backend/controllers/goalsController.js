const asyncHandler = require('express-async-handler');
const Goals = require('../model/goalModel');
const User = require('../model/userModel');
// @desc    Get the goals
// @request GET /api/goals
// @access  Private
const getGoals = asyncHandler(async(req,res) => {
    const goal = await Goals.find({ user: req.user.id});
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
        text:req.body.text,
        user:req.user._id,
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
    const user = req.user;
    if(!user) {
        res.status(401)
        throw new Error('user not found');
    }
    if(goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized..');
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
    const user = req.user;
    if (!user) {
        res.status(401)
        throw new Error('user not found');
    }
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized..');
    }
    goal.remove();
    res.json({ id : req.params.id });
});

module.exports = { getGoals,postGoal,updateGoal,deleteGoal };
