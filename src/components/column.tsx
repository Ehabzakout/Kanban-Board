import { useContext } from "react";
import { Task } from "../interfaces";
import Card from "./card";
import { DataContext } from "../App";

export default function Column({
  title,
  tasks = [],
  id,
  columnIndex,
}: {
  title: string;
  tasks: Task[];
  id: number;
  columnIndex: number;
}) {
  const { dataState, selectedBoardIndex, setDataState } =
    useContext(DataContext);
  function addNewTask() {
    const columns = dataState[selectedBoardIndex].columns;
    const newId = Date.now();
    const newColumnsArray = columns.map((column) => {
      if (column.id === id) {
        return {
          ...column,
          tasks: [
            ...(column?.tasks || []),
            {
              id: newId,
              title: "New Task",
              description: "None",
            },
          ],
        };
      }
      return column;
    });

    const newData = [...dataState];
    newData[selectedBoardIndex] = {
      ...newData[selectedBoardIndex],
      columns: newColumnsArray,
    };
    setDataState(newData);
  }
  function deleteColumn() {
    if (window.confirm(`Are you sure you want to delete  ${title} column?`)) {
      const newData = [...dataState];
      newData[selectedBoardIndex].columns = newData[
        selectedBoardIndex
      ].columns.filter((column) => column.id !== id);
      setDataState(newData);
    }
  }
  return (
    <>
      <div className="h-fit rounded-lg bg-lines-light p-2 text-[10px] sm:w-full md:w-[calc((100%-30px)/2)] lg:w-[calc((100%-30px)/3)]">
        <div className="group flex items-center justify-between">
          <h1 className="mb-2 font-bold">{`${title} ${tasks.length}`}</h1>
          <button
            onClick={deleteColumn}
            className="mb-1 text-[9px] font-semibold text-red opacity-0 duration-300 group-hover:opacity-100"
          >
            Delete
          </button>
        </div>
        <div>
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              title={task?.title || ""}
              taskId={task.id}
              columnId={id}
              columnIndex={columnIndex}
              taskIndex={index}
            />
          ))}
        </div>
        <button
          onClick={() => addNewTask()}
          className="before w-full tracking-widest text-medium-grey before:bg-medium-grey/25"
        >
          + Add New Task
        </button>
      </div>
    </>
  );
}
