const Todo = require('../modules/todo');
 
 const checkTodoID = async (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).send({
            success: false,
            message: 'Incorrect Id'
        })
    }

    const todo = await Todo.findByPk(id);
    if (!todo) {
        return res.status(404).send({
            success: false,
            message: 'Todo not found'
        })
    }
    req.todo = todo;
    next()
}

module.exports = checkTodoID;