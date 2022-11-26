import ApiError from "../exception/apiErrors";
import { ITodo } from "../interfaces/todo-interface";
import { TodoModels } from "../model/todo-model"

export class TodoService {

  static async getPaginateService(page: string, limit: string, id: string) {
    const paginated = await TodoModels.paginate({ query: { userID: id }, page, limit, sort: { _id: -1 }, lean: true })
    if (!paginated) {
      throw ApiError.BadRequest("Paginate error");
    }
    return paginated
  }

  static async getTodoService(id: { userID: string }) {
    const received = await TodoModels.find(id).sort({ _id: -1 });
    if (!received) {
      throw ApiError.BadRequest("DataBase error!");
    }
    return received
  }

  static async saveTodoService(req: { title: string, description: string, userID: string }) {
    const data = new TodoModels(req);
    const saved = await data.save();
    return saved
  }

  static async updateTodoService(id: { _id: string }, body: { "$set": ITodo }) {
    await TodoModels.updateOne(id, body);
    const updated = await TodoModels.findById(id)
    return updated
  }

  static async deleteTodoService(id: { _id: string }) {
    const deleted = await TodoModels.deleteOne(id);
    return deleted
  }
}