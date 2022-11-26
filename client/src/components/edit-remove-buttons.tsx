import { CreateOutline, TrashOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { deleteTodoStart } from "../redux/slices/todo-slice";

type Props = {
  editState: boolean;
  id: string;
  editHandler: () => void;
};

export function EditRemoveButtons({
  editState,
  id,
  editHandler,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  return (
    <div className="w-16 absolute flex gap-3 justify-center items-center flex-col top-0 right-0 h-full">
      {!editState && (
        <div
          onClick={() => editHandler()}
          className="grid place-items-center w-[30px] h-[30px] bg-green-500 rounded-full hover:opacity-90"
        >
          <CreateOutline color={"#fff"} height="20px" width="20px" />
        </div>
      )}
      <div
        onClick={() => dispatch(deleteTodoStart({ id }))}
        className="grid place-items-center w-[30px] h-[30px] bg-[crimson] rounded-full hover:opacity-90"
      >
        <TrashOutline color={"#fff"} height="20px" width="20px" />
      </div>
    </div>
  );
}
