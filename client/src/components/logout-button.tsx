import { LogOutOutline } from "react-ionicons";
import { useDispatch } from "react-redux";

import { logoutStart, resetAuthState } from "../redux/slices/auth-slice";
import { resetTodoState } from "../redux/slices/todo-slice";

export function LogOutButton(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(logoutStart());
        dispatch(resetAuthState());
        dispatch(resetTodoState());
      }}
      className="bg-[crimson] flex gap-2 items-center px-4 py-1 cursor-pointer rounded-md hover:opacity-90"
    >
      Log Out
      <LogOutOutline color={"#fff"} height="27px" width="27px" />
    </div>
  );
}
