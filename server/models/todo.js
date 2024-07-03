const mongoose = require('mongoose');

const Todo_Schema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
    createdOn: {
        type: "String",
        default: () => { 
            const date = new Date();
            return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
        },
    }
});

const ToDo = mongoose.model("ToDo_List",Todo_Schema);

module.exports = ToDo;