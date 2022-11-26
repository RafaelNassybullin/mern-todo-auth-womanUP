
//спинер для предзагрузки получения данных
export function CardLoader():JSX.Element {
  return (
    <div className="w-full h-20 grid place-items-center">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-8 border-solid border-green-500 border-t-transparent shadow-md"
      ></div>
    </div>
  );
}
