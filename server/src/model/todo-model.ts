import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../interfaces/todo-interface';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

const TodoModel: Schema<ITodo> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        userID: { type: String, required: true },
        checked: { type: Boolean, default: false },
        image: { type: String, default: "" }
    },
    {
        timestamps: true
    }
);

TodoModel.plugin(mongoosePagination);
export const TodoModels: Pagination<ITodo> = mongoose.model<ITodo, Pagination<ITodo>>("todoData", TodoModel);