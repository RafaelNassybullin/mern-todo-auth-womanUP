import { useDispatch } from "react-redux";
import { loginStart } from "../redux/slices/auth-slice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "../interfaces/auth-types";

export function LoginInputs(): JSX.Element {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Не валидный емайл")
      .required("Поле email обязательно к заполнению!"),
    password: yup
      .string()
      .min(8, "Пароль должен быть больше 8 символов")
      .required("Поле password обязательно к заполнению!"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const submitData: SubmitHandler<Login> = (data: Login): void => {
    dispatch(loginStart(data));
  };

  return (
    <form className="flex flex-col w-[440px] bg-zinc-800 p-10 rounded-xl">
      <h1 className="text-3xl text-center">Login</h1>

      <input
        type="text"
        placeholder="email"
        className={`input h-10 bg-white text-black mt-4 ${
          errors.email ? "focus:outline-[crimson]" : "focus:outline-green-500"
        }`}
        {...register("email", { required: true })}
      />
      {errors.email && (
        <p className="text-[crimson]">{errors.email?.message}</p>
      )}

      <input
        type="password"
        placeholder="password"
        className={`input h-10 bg-white text-black mt-4 ${
          errors.password
            ? "focus:outline-[crimson]"
            : "focus:outline-green-500"
        }`}
        {...register("password", { required: true })}
      />
      {errors.password && (
        <p className="text-[crimson]">{errors.password?.message}</p>
      )}

      <button
        className="bg-green-500 w-full py-3 rounded-[7px] hover:opacity-90 mt-4"
        type={"submit"}
        onClick={handleSubmit(submitData)}
      >
        Войти
      </button>
    </form>
  );
}
