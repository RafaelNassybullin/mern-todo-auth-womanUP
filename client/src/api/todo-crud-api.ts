import { GetTypes, SaveTypes, TodoTypes } from "../interfaces/todo-types";
import $authInterceptor, { API_URL } from "./auth-axios-interceptor";

//запрос на добавление todo, лимит 10 карточек
export const saveByUserIdTodo_API = async ({ title, description, userID }: SaveTypes) => {
  return await $authInterceptor.post(`${API_URL}/saveTodo/${userID}`, { title, description });
}

//запрос на постраничный вывод todo, лимит 15 карточек
export const getByUserIdTodoPage_API = async ({ page, userID }: GetTypes) => {
  return await $authInterceptor.get(`${API_URL}/getByUserIdTodo/${userID}?page=${page}&limit=15`);
}

//получить все данные
export const getByUserIdTodoAll_API = async (userID: string) => {
  return await $authInterceptor.get(`${API_URL}/getByUserIdTodo/${userID}`);
}

//запрос на получение всех todo пользователя
export const getByUserIdTodo_API = async (userID: string) =>
  await $authInterceptor.get(`${API_URL}/getByUserIdTodo/${userID}`);

//запрос на удаление карточки пользователя
export const deleteByUserIdTodo_API = async (id: string) => {
  return await $authInterceptor.delete(`${API_URL}/deleteTodo/${id}`);
}

//запрос на обновление данных карточки todo
export const updateByUserIdTodo_API = async (data: TodoTypes) => {
  return await $authInterceptor.patch(`${API_URL}/updateTodo/${data._id}`, data);
}

//запрос на загрузку картинки в карточку todo
export const uploadImage_API = async (data: any) =>
  await $authInterceptor.post(`${API_URL}/upload`, data, {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (progressEvent: any) => {
      // setUploadPercentage(
      //   parseInt(
      //     Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //   )
      // );
    }
  });


