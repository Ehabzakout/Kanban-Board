import { useContext, useState } from "react";
import CreateBoard from "./createBoard";
import DialogDemo from "./Dialog";
import DropdownMenuDemo from "./dropDown";
import { DataContext } from "../App";

export default function Header() {
  const { dataState, selectedBoardIndex, setDataState } =
    useContext(DataContext);
  const [open, setOpen] = useState<boolean>(false);
  function Edit() {
    setOpen(true);
  }
  const selectedBoard = dataState[selectedBoardIndex];
  function deleteBoard() {
    if (window.confirm(" Are you sure you want to delete this Board?")) {
      let newData = [...dataState];
      newData = newData.filter(
        (board) => board.id !== newData[selectedBoardIndex].id,
      );
      if (!newData.length) localStorage.setItem("data", JSON.stringify([]));
      setDataState(newData);
    }
  }
  return (
    <>
      <header className="flex w-full items-center border-t border-lines/25 font-bold text-main-purple sm:text-heading-s md:text-heading-l">
        <div className="w-1/4 border-l border-r border-lines/25 p-3">
          Kanban
        </div>
        <div className="flex w-3/4 items-center justify-between border-b border-r border-lines/25 p-3">
          <h2>Platform Launch</h2>
          <DropdownMenuDemo
            items={[
              {
                lable: "Edit Board",
                onClick: () => Edit(),
                class: "text-black font-bold",
              },
              {
                lable: "Delete Board",
                onClick: () => deleteBoard(),
                class: "text-red font-bold",
              },
            ]}
            triggerComponent={
              <button className="px-2 text-lines outline-none">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            }
          />
          <DialogDemo open={open} setOpen={setOpen} title="Edit Board">
            <CreateBoard
              toggleDialog={setOpen}
              boardId={selectedBoard?.id}
              title={selectedBoard?.title}
            ></CreateBoard>
          </DialogDemo>
        </div>
      </header>
    </>
  );
}
