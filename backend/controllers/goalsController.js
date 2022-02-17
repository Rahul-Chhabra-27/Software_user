const asyncHandler = require('express-async-handler');
// @desc    Get the goals
// @request GET /api/goals
// @access  Private
const getGoals = asyncHandler(async(req,res) => {
    res.json({ message: 'Get the Goals' });
})
// @desc    Post the goal
// @request POST /api/goals
// @access  Private
const postGoal = asyncHandler(async(req, res) => {
    if(!req.body.type) {
        res.status(400);
        throw new Error('Please enter the value type..')
    }
    res.json({ message: 'set the Goals' });
})
// @desc    Update the goal
// @request PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async(req, res) => {
    res.json({ message: 'update the goal' });
});
// @desc    Delete the goals
// @request DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async(req, res) => {
    res.json({ message: 'delete the goal' });
});

module.exports = { getGoals,postGoal,updateGoal,deleteGoal };