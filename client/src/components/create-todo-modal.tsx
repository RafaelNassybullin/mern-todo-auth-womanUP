import { CloseCircleOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
//слайс сохранения
import { saveTodoStart } from "../redux/slices/todo-slice";
//хуки хук форм
import { SubmitHandler, useForm } from "react-hook-form";
//яп для валидейшн
import * as yup from "yup";
//резолвер для подлючения хук форм к яп
import { yupResolver } from "@hookform/resolvers/yup";

//типы отправляемых данных
import { SaveTypes } from "../interfaces/todo-types";

interface Props {
  close: () => void;
}

//модалка для создания тудушек
export function CreateTodoModal({ close }: Props): JSX.Element {
  const dispatch = useDispatch();

  //валидания с помощью yup
  const schema = yup.object().shape({
    title: yup.string().required("Title не может быть пустым!"),
    description: yup.string(),
  });

  //хук от react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "" },
    resolver: yupResolver(schema),
  });

  //функция для сабмита
  const submitData: SubmitHandler<SaveTypes> = (data: SaveTypes): void => {
    dispatch(saveTodoStart(data));
    close();
  };

  return (
    <div className="fixed top-0 grid place-items-center left-0 w-full h-screen bg-[#3C40434D] backdrop-blur-md z-10">
      <form className="w-1/2 relative flex flex-col h-[450px] p-16 bg-black rounded-xl">
        <h1 className="text-3xl text-center">Create Todo</h1>

{/* тайтл обязательное поле */}
        <input
          type="text"
          placeholder="title"
          className={`input mt-5 h-10 ${
            errors.title ? "focus:outline-[crimson]" : "focus:outline-green-500"
          }`}
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p className="text-[crimson]">{errors.title?.message}</p>
        )}

{/* описание */}
        <textarea
          placeholder="descriptions"
          className="input h-40 resize-none mt-5"
          {...register("description", { required: true })}
        />


        <div className="flex gap-5 w-full mt-5">
          {/* подтвердить сохранение */}
          <button
            type={"submit"}
            onClick={handleSubmit(submitData)}
            className="bg-green-500 px-5 py-1 rounded-[7px] hover:opacity-90"
          >
            Apply
          </button>
          {/* отменить сохранение */}
          <button
            onClick={() => close()}
            className="bg-red-500 px-5 py-1 rounded-[7px] hover:opacity-90"
          >
            Cancel
          </button>
        </div>

{/* закрыть модалку */}
        <CloseCircleOutline
          onClick={() => close()}
          cssClasses="absolute top-3 right-3 cursor-pointer hover:text-[crimson]"
          color={"#fff"}
          height="40px"
          width="40px"
        />
      </form>
    </div>
  );
}
