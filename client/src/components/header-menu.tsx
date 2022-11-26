import {
  AddCircleOutline,
  ClipboardOutline,
  FileTrayStackedOutline,
} from "react-ionicons";
import { LogOutButton } from "./logout-button";

type Props = {
  tabState: boolean;
  pageTab: () => void;
  allTab: () => void;
  modalHandler: () => void;
};

//верхнее меню с табами
export function HeaderMenu({
  tabState,
  pageTab,
  allTab,
  modalHandler,
}: Props): JSX.Element {
  return (
    <div className="text-xl flex justify-between items-center mt-5">
      <div className="flex gap-5">
        {/* создать новый туду */}
        <div
          // открыть модалку
          onClick={modalHandler}
          className="cursor-pointer rounded-[5px] hover:bg-stone-800 p-1 flex items-center gap-2"
        >
          <AddCircleOutline color={"#fff"} height="20px" width="20px" />
          <p>Create</p>
        </div>

        {/* таб для постраничного туду */}
        <div
          onClick={pageTab}
          className={`cursor-pointer ${
            tabState ? "text-green-500" : "text-white"
          } rounded-[5px] hover:bg-stone-800 p-1 flex items-center gap-2`}
        >
          <ClipboardOutline
            color={tabState ? "#22C55D" : "#fff"}
            height="20px"
            width="20px"
          />
          <p>Todo</p>
        </div>

        {/* таб для всех туду */}
        <div
          onClick={allTab}
          className={`cursor-pointer ${
            !tabState ? "text-green-500" : "text-white"
          } rounded-[5px] hover:bg-stone-800 p-1 flex items-center gap-2`}
        >
          <FileTrayStackedOutline
            color={!tabState ? "#22C55D" : "#fff"}
            height="20px"
            width="20px"
          />
          <p>Get all</p>
        </div>
      </div>

      {/* логаут */}
      <LogOutButton />
    </div>
  );
}
