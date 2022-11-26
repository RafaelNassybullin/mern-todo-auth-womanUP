import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//тип массива данных туду
import { TodoTypes } from "../interfaces/todo-types";

//селекторы лоадера и массива всех данных
import {
  allDataReselect,
  todoLoaderReselect,
} from "../redux/selectors/todo-selector";

//слайс для получения всех данных
import { getDataById_PageStart } from "../redux/slices/todo-slice";

//компонент спинера
import { CardLoader } from "./card-loader";

//карточка тудушки
import { CardTodo } from "./card-todo";

//таб для получения всех туду
export function AllTodos(): JSX.Element {
  const dispatch = useDispatch<Dispatch>();
  //данные всех тудушек
  const data: TodoTypes[] = useSelector(allDataReselect);
  //прелоадер
  const loader: boolean = useSelector(todoLoaderReselect);

  useEffect(() => {
    dispatch(getDataById_PageStart());
  }, []);

  return (
    <>
      {data.map((item: TodoTypes) => (
        <CardTodo key={item._id} data={item} />
      ))}
      {loader && <CardLoader />}
    </>
  );
}
