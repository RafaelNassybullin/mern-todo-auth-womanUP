//лоадер для авторизации
export function AuthLoader():JSX.Element {
  return (
    <div className="fixed grid place-items-center top-0 left-0 w-full h-screen">
      <div className="loader">Загрузка...</div>
    </div>
  );
}
