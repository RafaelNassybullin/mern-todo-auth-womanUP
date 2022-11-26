import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//тип данных для массива туду
import { TodoTypes } from "../interfaces/todo-types";

//слайс для запуска сага мидлвар обновления данных карточки
import { updateTodoStart } from "../redux/slices/todo-slice";

//кнопки подтвердить или отменить обновления карточки туду
import { EditAcceptButtons } from "./edit-accept-buttons";

//инпуты и текст редактирования данных
import { EditInputs } from "./edit-inputs";

//кнопки редактировать или удалить карточки
import { EditRemoveButtons } from "./edit-remove-buttons";

//инпут загрузки изображения
import { UploadImage } from "./upload-image";

//компонент изображения
import { ImageComponent } from "./image-component";

//запрос на апи с помощью аксиос
import { uploadImage_API } from "../api/todo-crud-api";

//проптайпс
type Props = {
  data: TodoTypes;
};

//компонент карточки туду
export function CardTodo({ data }: Props): JSX.Element {
  const dispatch = useDispatch();

  //деструктуризация обьекта карточки, для удобного использования нужных данных
  const { _id: id, userID, checked } = data;

  //стейт для открытия инпутов
  const [edit, setEdit] = useState<boolean>(false);

  //стейт инпута title
  const [title, setTitle] = useState<string>(data.title);

  //стейт инпута description
  const [description, setDescription] = useState<string>(data.description);

  //стейт для чекбокса
  const [check, setCheck] = useState<boolean>(checked);

  //стейт картинки
  const [imageState, setImageState] = useState(data.image);

  //скелетная загрузка обновления данных
  const [updLoader, setUpdLoader] = useState(false);

  //стейт файла
  const [loadedFile, setLoadedFile] = useState<any>();

  //обьект для сбора данных, обновленных
  const updatedTodo = {
    _id: id,
    title,
    description,
    userID,
    checked: !check,
    image: imageState,
  };

  //функция отправки файла
  const sendFile = async () => {
    //удаляем пробелы
    const trimName = loadedFile?.name.replace(/\s+/g, "");

    //получаем тип изображения
    const fileType = trimName.split(".").pop();

    //создаем экземпляр класса formData
    const data = new FormData();

    //меняю имя файла на uuid шоб не было повторений
    data.append("image", loadedFile, uuidv4() + "." + fileType);

    //получаю ответ из апи
    const res = await uploadImage_API(data);

    //да да, промис внутри async await...
    new Promise((resolve, _) => {
      //стейт изображения меняю на ответ из сервера
      setImageState(res.data.image);

      //вперед
      resolve(res.data.image);
    }).then((value) => {

      //если есть ответ то
      if (value) {

        //диспатчим обновление
        dispatch(

          updateTodoStart({

            //берем на данные
            ...updatedTodo,

            //обновленное изображение из сервера
            image: `${value}`,

            //убираем чек
            checked: false,
          })
        );

        //после редактирования убираем чек
        setCheck(false);

        //закрыть инпуты
        setEdit(false);
      }
    });
  };

//функция для отпрвки checked на сервер
  const checkHandler = useCallback(() => {
    new Promise((resolve, _) => {

      //изменяем состояние инпута
      setCheck(!check);

      //вперед
      resolve("вперед!!!!!");
    }).then(() => {

      //отправка данных с модифицированным checked
      dispatch(updateTodoStart(updatedTodo));
    });
  }, [check]);

  //функция для обновления
  function updateCard() {

    //если титле пустой то отменяем все
    if (!title.trim()) {

      //если инпут пустой убираем редактирование
      cancelEdit();
    } else {

      //запуск редакс-слайса updateTodoStart, убираем check на сервере
      dispatch(updateTodoStart({ ...updatedTodo, checked: false }));

      //после редактирования убираем чек
      setCheck(false);

      //закрыть инпуты
      setEdit(false);

      //лоадер для обновления текста карточки
      setUpdLoader(true);

      //скелетон лоадер для тектста
      setTimeout(() => setUpdLoader(false), 1000);
    }
  }

  //отмена редактирования
  function cancelEdit() {
    //установить изначальные данные инпута
    setTitle(data.title);
    setDescription(data.description);
    setImageState(data.image);
    setLoadedFile("");
    //закрыть инпуты
    setEdit(false);
  }

  return (
    <div
      //меняем цвет карточка при изменении check
      className={`w-full flex flex-col gap-1 relative min-h-[100px] mt-5 ${
        !check
          ? "bg-stone-800 hover:bg-[#292524E6]"
          : "bg-[#202124] hover:bg-[#202124E6]"
      } p-3 rounded-[15px] cursor-pointer`}
    >

      {/* инпуты редактирования */}
      <EditInputs
        checkState={check}
        checkHandler={checkHandler}
        editState={edit}
        data={data}
        title={title}
        description={description}
        titleChange={(value: string) => setTitle(value)}
        descriptionChange={(value: string) => setDescription(value)}
        loaderUpdate={updLoader}
      />

      {/* картинка */}
      {imageState && (
        <ImageComponent
          editState={edit}
          removeImage={() => setImageState("")}
          check={check}
          title={data.title}
          image={imageState}
        />
      )}

      {/* загрузка изображений */}
      {!imageState && (
        <UploadImage
          fileHandler={(value: any) => setLoadedFile(value)}
          editState={edit}
          file={loadedFile}
        />
      )}

      {/* кнопка подтвердить редактирование */}
      <EditAcceptButtons
        editState={edit}
        update={() => {
          if (loadedFile) {
            sendFile();
          } else {
            updateCard();
          }
        }}
        cancel={cancelEdit}
      />

      {/* отмена ректирования */}
      <EditRemoveButtons
        editState={edit}
        id={id}
        editHandler={() => setEdit(true)}
      />
    </div>
  );
}
