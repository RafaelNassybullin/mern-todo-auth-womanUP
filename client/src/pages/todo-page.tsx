import { useState } from "react";
import { AllTodos } from "../components/all-todos";
import { CreateTodoModal } from "../components/create-todo-modal";
import { HeaderMenu } from "../components/header-menu";
import { PageTodos } from "../components/page-todos";

export function TodoPage(): JSX.Element {
  const [state, setState] = useState(false);
  const [tab, setTab] = useState(true);

  return (
    <>
      <div className="container">
        <HeaderMenu
          tabState={tab}
          allTab={() => setTab(false)}
          pageTab={() => setTab(true)}
          modalHandler={() => setState(!state)}
        />
        {!tab ? <AllTodos /> : <PageTodos />}
      </div>
      {state && <CreateTodoModal close={() => setState(!state)} />}
    </>
  );
}
