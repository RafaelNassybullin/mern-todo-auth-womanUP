import { CheckmarkCircleOutline, CloseCircleOutline } from "react-ionicons";

type Props = {
  editState: boolean;
  update: () => void;
  cancel: () => void;
};

export function EditAcceptButtons({
  editState,
  update,
  cancel,
}: Props): JSX.Element {
  return (
    <>
      {editState && (
        <div className="flex gap-4 mt-2">
          <div
            onClick={update}
            className="grid place-items-center w-[192px] h-[30px] bg-green-500 rounded-full hover:opacity-90"
          >
            <CheckmarkCircleOutline color={"#fff"} height="25px" width="25px" />
          </div>
          <div
            onClick={cancel}
            className="grid place-items-center w-[192px] h-[30px] bg-[crimson] rounded-full hover:opacity-90"
          >
            <CloseCircleOutline color={"#fff"} height="25px" width="25px" />
          </div>
        </div>
      )}
    </>
  );
}
