import { CloseCircleOutline } from "react-ionicons";

export function ImageComponent({
  editState,
  removeImage,
  check,
  title,
  image,
}: any) {
  return (
    <>
      <div
        className={`${
          !editState ? "w-[440px] h-[340px]" : "w-[150px] h-[150px]"
        }  overflow-hidden rounded-2xl relative`}
      >
        {editState && (
          <div className="absolute w-full h-full bg-[#9CA3AF4D] hover:backdrop-blur-md">
            <CloseCircleOutline
              onClick={removeImage}
              cssClasses="absolute top-1 right-1 cursor-pointer"
              color={"crimson"}
              height="25px"
              width="25px"
            />
          </div>
        )}

        {check && !editState && (
          <div className="absolute w-full cursor-pointer h-full bg-[#3C40434D] backdrop-blur-md"></div>
        )}
        <img
          className="w-full h-full object-cover"
          src={`http://localhost:1337/images/${image}`}
          alt={title}
        />
      </div>
    </>
  );
}
