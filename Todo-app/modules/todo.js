const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:./db.sqlite3');
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('! DB NOT Connected !'))


const Todo = sequelize.define('todos', {
    title: {
        type: DataTypes.STRING(256), 
        allowNull: false
    },
    description: DataTypes.TEXT,
    priority: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
});
// sequelize.sync();

module.exports = Todo;