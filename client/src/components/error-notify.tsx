import { useSelector, useDispatch } from "react-redux";
import { errorReselect } from "../redux/selectors/auth-selector";
import { errorDestroyer } from "../redux/slices/auth-slice";

export function ErrorNotify(): JSX.Element {
  const dispatch = useDispatch();
  const errorState = useSelector(errorReselect);

  return (
    <>
      {errorState && (
        <div className="absolute w-full h-32 top-0 left-0 grid place-items-center">
          <div
            className="bg-red-100 w-full max-w-[900px] border border-red-400 text-red-700 m-5 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Святая корова! </strong>
            <span className="block sm:inline">
              Этож ошибка авторизации! Или сервер на eкспресе опять накрылся ;)
            </span>
            <span
              onClick={() => dispatch(errorDestroyer())}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
