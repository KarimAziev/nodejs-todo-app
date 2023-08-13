import { Response, Request } from 'express';
import { ITodo } from './../../types/todo';
import Todo from '../../models/todo';

/**
 * Handler for retrieving all Todos.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */

const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

/**
 * Handler for adding a new Todo.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
const addTodo = async (
  req: Request<
    null,
    { message: 'Todo added'; todo: ITodo; todos: ITodo[] },
    Pick<ITodo, 'name' | 'description' | 'status'>
  >,
  res: Response
): Promise<void> => {
  try {
    const body = req.body;

    const todo = new Todo({
      name: body.name,
      description: body.description || '',
      status: body.status || false,
    });

    const newTodo = await todo.save();
    const allTodos = await Todo.find();

    res
      .status(201)
      .json({ message: 'Todo added', todo: newTodo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

/**
 * Handler for updating an existing Todo by ID.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
const updateTodo = async (
  req: Request<
    { id: string },
    {
      message: 'Todo updated';
      todo: ITodo;
      todos: ITodo[];
    },
    ITodo
  >,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatedTodo = await Todo.findByIdAndUpdate({ _id: id }, body);
    const allTodos = await Todo.find();
    const result = {
      message: 'Todo updated',
      todo: updatedTodo,
      todos: allTodos,
    };
    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

/**
 *  Handler for deleting a Todo by ID.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    const allTodos = await Todo.find();
    const body = {
      message: 'Todo deleted',
      todo: deletedTodo,
      todos: allTodos,
    };
    res.status(200).json(body);
  } catch (error) {
    throw error;
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
