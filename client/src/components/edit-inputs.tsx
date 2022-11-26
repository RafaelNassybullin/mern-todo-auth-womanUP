import { TodoTypes } from "../interfaces/todo-types";

type Props = {
  checkState: boolean;
  checkHandler: () => void;
  editState: boolean;
  data: TodoTypes;
  title: string;
  description: string;
  titleChange: any;
  descriptionChange: any;
  loaderUpdate: boolean;
};

export function EditInputs({
  checkState,
  checkHandler,
  editState,
  data,
  title,
  description,
  titleChange,
  descriptionChange,
  loaderUpdate,
}: Props): JSX.Element {
  return (
    <>
      {!editState ? (
        <div className="flex items-center">
          {!loaderUpdate ? (
            <>
              <input
                id="link-checkbox"
                type="checkbox"
                checked={checkState}
                onChange={() => checkHandler()}
                className="w-5 h-5 mr-3 accent-green-500 rounded-2xl bg-gray-700 border-gray-600"
              />
              <label
                onClick={() => checkHandler()}
                htmlFor="link-checkbox "
                className={`text-3xl ${
                  checkState ? "line-through text-gray-400" : ""
                } cursor-pointer`}
              >
                {data.title}
              </label>
            </>
          ) : (
            <div className="h-7 animate-pulse rounded-xl bg-black w-[450px] mb-2"></div>
          )}
        </div>
      ) : (
        <input
          type="text"
          placeholder="title"
          className="input h-10 w-[400px] bg-black"
          value={title}
          onChange={(event) => titleChange(event.target.value)}
        />
      )}
      {!editState ? (
        <>
          {!loaderUpdate ? (
            <p className="text-gray-400">{data.description}</p>
          ) : (
            <div className="h-7 animate-pulse rounded-xl bg-black w-[280px]"></div>
          )}
        </>
      ) : (
        <textarea
          placeholder="description"
          className="input w-[400px] bg-black "
          value={description}
          onChange={(event) => descriptionChange(event.target.value)}
        />
      )}
    </>
  );
}
