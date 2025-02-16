import TextField from "./textField";
import cross from "../assets/icon-cross.svg";
import Button from "./button";
import { SetStateAction, useContext, useState } from "react";
import { DataContext } from "../App";
import { Board, Columns, Task } from "../interfaces";

export default function CreateBoard({
  toggleDialog,
  boardId,
  title,
}: {
  toggleDialog: React.Dispatch<SetStateAction<boolean>>;
  boardId?: number;
  title?: string;
}) {
  const { dataState, selectedBoardIndex, setDataState, setSelectedBoardIndex } =
    useContext(DataContext);
  const [columnData, setColumnData] = useState(
    dataState[selectedBoardIndex]?.columns || [{ id: Date.now() }],
  );
  function addHandler() {
    if (!dataState.length) {
      setDataState([]);
    }
    const newData = [
      ...dataState[selectedBoardIndex].columns,
      { id: Date.now(), title: "", tasks: [] },
    ];
    setColumnData(newData);
  }
  function removeHandler(id: number) {
    setColumnData((prev) => prev.filter((el) => el.id !== id));
  }
  function createColumnsArray(
    formData: FormData,
    columnData: { id: number; tasks?: Task[] }[],
  ) {
    return columnData?.map((column) => {
      const tasksArray = column.tasks || [];
      return {
        id: column.id,
        title: formData.get(`${column.id}`) as string,
        tasks: tasksArray,
      };
    });
  }
  function updateData(boardName: string, newColumnArray: Columns[]) {
    let newdata: Board[];
    if (boardId) {
      newdata = dataState.map((board: Board) => {
        if (board.id === boardId) {
          return {
            ...board,
            title: boardName,
            columns: newColumnArray,
          };
        }
        return board;
      });
    } else {
      setSelectedBoardIndex(dataState.length);
      newdata = [
        ...dataState,
        { title: boardName, id: Date.now(), columns: newColumnArray },
      ];
    }
    setDataState(newdata);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const boardName = formData.get("boardName") as string;
    const newColumnArray = createColumnsArray(formData, columnData);
    updateData(boardName, newColumnArray);
    toggleDialog(false);
  }
  return (
    <>
      <form className="text-[10px]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <TextField
            placeholder="e.g. Web design"
            required={true}
            name="boardName"
            defaultValue={title}
          />
        </div>
        <div className="mt-2">
          <label>Columns</label>
          {columnData.map((obj) => (
            <div className="mb-3 mt-1 flex gap-2" key={`${obj.id}`}>
              <TextField
                placeholder="e.g. Web design"
                name={`${obj.id}`}
                defaultValue={boardId ? obj.title : ""}
              />
              <img
                src={cross}
                alt="cross Icon"
                className="cursor-pointer object-contain"
                onClick={() => removeHandler(obj.id)}
              ></img>
            </div>
          ))}

          <span
            onClick={addHandler}
            className="duratin-200 block h-7 w-full cursor-pointer content-center rounded-full bg-main-purple/10 px-6 text-center text-[10px] font-bold text-main-purple hover:bg-main-purple/25"
          >
            + Add New Column
          </span>
        </div>
        <div className="mt-3">
          <Button intent="primary" width={true}>
            {boardId ? "Update" : "Create New"} Board
          </Button>
        </div>
      </form>
    </>
  );
}
