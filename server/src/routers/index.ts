import express from 'express';
// import multer from 'multer';
//контроллер авторизации
import AuthController from "../controllers/auth-controller"
//контроллер для данных туду
import TodoController from "../controllers/todo-controller"
//мидлвар авторизации
import { AuthMiddleware } from "../middlewares/auth-middleware"


//инстанс от функции конструктора роутер
const router = express.Router();

//регистрация
router.post("/registration", AuthController.registration);
//вход в аккаунт
router.post("/login", AuthController.login);
//выход из аккаунта
router.post("/logout", AuthController.logout);
//обновить токен
router.get("/refresh", AuthController.refresh);

//получить данные
router.get("/getByUserIdTodo/:userID", AuthMiddleware, TodoController.getTodo);
//сохранить новый todo
router.post("/saveTodo/:userID", AuthMiddleware, TodoController.saveTodo);
//обновить и получить обновленные данные туду карточки 
router.patch("/updateTodo/:id", AuthMiddleware, TodoController.updateTodo);
//удалить карточку
router.delete("/deleteTodo/:id", AuthMiddleware, TodoController.deleteTodo);

router.post("/upload", AuthMiddleware, TodoController.uploadImage);

export = router;

//TodoList FullStack REST, MERN 
//* React.js + Tailwind + Express + Mongo
//* with Authorization and Infinite Scroll server pagination
//* REST, Redux-Toolkit, Redux-Saga
//* JWT refresh, access
//* File uploading
//* Strongly typed TypeScript syntax
//* all line in comment (but in russian language)



