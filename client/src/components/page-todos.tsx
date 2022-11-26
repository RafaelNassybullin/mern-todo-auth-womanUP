import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoTypes } from "../interfaces/todo-types";

import {
  dataCountReselect,
  dataReselect,
  isFetch,
  pages,
  todoLoaderReselect,
} from "../redux/selectors/todo-selector";
import { pushIsFetching, pushScrollData } from "../redux/slices/todo-slice";
import { CardLoader } from "./card-loader";
import { CardTodo } from "./card-todo";

export function PageTodos(): JSX.Element {
  const dispatch = useDispatch<Dispatch>();
  const data = useSelector(dataReselect);
  //страница по дефолту 1
  const page = useSelector(pages);
  //данных есть в базе
  const dataCount = useSelector(dataCountReselect);
  //лоадер пагинации
  const loader = useSelector(todoLoaderReselect);
  //свитчер для запуска диспатча
  const isFetching = useSelector(isFetch);
  //карточек получаем по 15 страницу
  useEffect(() => {
    if (isFetching && data.length < dataCount) {
      dispatch(pushScrollData(page));
    }
  }, [isFetching]);
  //получаем длинну скролла, баунсингом не заморачивался ибо тестовое
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  //переключатель свитчера isFetching
  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      93
    ) {
      dispatch(pushIsFetching(true));
    }
  };

  return (
    <>
      {data.map((item: TodoTypes) => (
        <CardTodo key={item._id} data={item} />
      ))}
      {loader && <CardLoader />}
    </>
  );
}
