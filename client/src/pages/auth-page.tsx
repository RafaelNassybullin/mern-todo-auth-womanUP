import { useState } from "react";
import { ErrorNotify } from "../components/error-notify";
import { LoginInputs } from "../components/login-inputs";
import { RegisterInputs } from "../components/register-inputs";

//страница для авторизации пользователя
export function AuthPage(): JSX.Element {
  const [state, setState] = useState<boolean>(true);

  return (
    <div className="w-full h-[100vh] relative">
      <div className="container h-full grid place-items-center">
        <div>
          {/* переключение модального окна авторизации */}
          {state ? <LoginInputs /> : <RegisterInputs />}
          {/* обработчик события переключения модалки авторизации */}
          <button
            className="text-sky-500 px-5 text-xl text-end cursor-pointer hover:text-green-500"
            onClick={() => setState(!state)}
          >
            {/* меняем текст */}
            {state ? "Регистрация" : "Логин"}
          </button>
        </div>
      </div>
      <ErrorNotify />
    </div>
  );
}
