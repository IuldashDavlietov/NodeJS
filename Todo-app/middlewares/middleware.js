const Todo = require('../modules/todo');
 
 const checkTodoID = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({
            success: false,
            message: 'Incorrect Id'
        })
    }
    next()
}
module.exports = checkTodoID;