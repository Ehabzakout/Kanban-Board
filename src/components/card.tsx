import { useContext, useState } from "react";
import { DataContext } from "./../App";
import { Columns } from "../interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({
  title,
  description,
  taskId,
  columnId,
  columnIndex,
  taskIndex,
}: {
  title: string;
  description?: string;
  taskId: number | undefined;
  columnId: number;
  columnIndex: number;
  taskIndex: number;
}) {
  const { dataState, selectedBoardIndex, setDataState } =
    useContext(DataContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskId ?? -1, data: { columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  function deleteTask() {
    if (window.confirm("Are You sure you want to delete this task?")) {
      const newData = [...dataState];
      newData[selectedBoardIndex].columns = newData[
        selectedBoardIndex
      ].columns.map((column: Columns) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        return column;
      });

      setDataState(newData);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onBlureHandler(e: any) {
    setEditMode(false);

    const newData = [...dataState];
    newData[selectedBoardIndex].columns[columnIndex].tasks[taskIndex].title =
      e.target.value;

    setDataState(newData);
  }
  return (
    <>
      <div
        className="mb-3 rounded-lg bg-white px-3 py-2"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="group flex flex-wrap">
          {editMode ? (
            <textarea
              defaultValue={title}
              onBlur={onBlureHandler}
              onFocus={(e) => e.target.select()}
              autoFocus
              className="h-auto w-3/4 whitespace-pre-wrap break-words"
              onKeyDown={(e) => {
                if (e.key === "Enter") onBlureHandler(e);
              }}
            ></textarea>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="h-auto w-3/4 content-center whitespace-pre-wrap break-words text-start"
            >
              {title}
            </button>
          )}
          <button
            className="ms-auto text-[9px] font-semibold text-red opacity-0 duration-300 group-hover:opacity-100"
            onClick={deleteTask}
          >
            Delete
          </button>
        </div>

        {description && (
          <div className="flex flex-wrap">
            <label className="font-bold">Description:</label>
            <h1 className="">{description}</h1>
          </div>
        )}
      </div>
    </>
  );
}
