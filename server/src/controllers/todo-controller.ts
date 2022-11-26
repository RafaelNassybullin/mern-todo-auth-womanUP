import { Response, Request, NextFunction } from "express";
import { TodoService } from "../service/todo-service"

export default class TodoController {

  static async getTodo(req: Request<{ userID: string }, {}, {}, { page: string, limit: string }>, res: Response, next: NextFunction) {
    try {
      if (req.query.page && req.query.limit) {
        const data = await TodoService.getPaginateService(req.query.page, req.query.limit, req.params.userID)
        res.status(200).json(data);
      } else {
        const data = await TodoService.getTodoService({ userID: req.params.userID })
        res.status(200).json(data);
      }
    } catch (e) {
      next(e)
      return
    }
  }

  static async saveTodo(req: Request<{ userID: string }>, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.saveTodoService({ ...req.body, userID: req.params.userID })
      res.status(201).json(data);
    } catch (e) {
      next(e)
      return
    }
  }

  static async updateTodo(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.updateTodoService({ _id: req.params.id }, { $set: req.body })
      console.log(req.body)
      res.status(200).json(data);
    } catch (e) {
      next(e)
      return
    }
  }

  static async deleteTodo(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const deletedTodo = await TodoService.deleteTodoService({ _id: req.params.id })
      res.status(200).json(deletedTodo);
    } catch (e) {
      next(e)
      return
    }
  }

  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ image: req.file?.filename })
    } catch (e) {
      next(e)
      return
    }
  }
}
