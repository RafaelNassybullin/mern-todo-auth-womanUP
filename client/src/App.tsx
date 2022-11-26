import { AuthPage } from "./pages/auth-page";
import { TodoPage } from "./pages/todo-page";
import { useSelector, useDispatch } from "react-redux";
import {
  isAuthReselect,
  loadingReselect,
} from "./redux/selectors/auth-selector";
import { useEffect } from "react";
import { refreshStart } from "./redux/slices/auth-slice";
import Cookies from "js-cookie";
import { AuthLoader } from "./components/auth-loader";

export function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthReselect);
  const isLoading = useSelector(loadingReselect);

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      dispatch(refreshStart());
    }
  }, []);

  if (isLoading) {
    return <AuthLoader />;
  }
  return <>{isAuth ? <TodoPage /> : <AuthPage />}</>;
}
