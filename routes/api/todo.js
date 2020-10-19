const express = require('express');

import * as todoController from '../../controllers/todo';

// router
const todoRouter = express.Router();

router.route('/')
    .get(todoController.getTodos)
    .post(todoController.addTodo)
    .put(todoController.updateTodo);

router.route('/:id')
    .get(todoController.getTodo)
    .delete(todoController.deleteTodo)

module.exports = todoRouter;

