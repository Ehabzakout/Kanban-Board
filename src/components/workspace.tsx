import { useContext, useMemo } from "react";
import Column from "./column";
import { DataContext } from "../App";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../interfaces";

export default function WorkSpace() {
  const { dataState, selectedBoardIndex, setDataState } =
    useContext(DataContext);
  const columns = dataState[selectedBoardIndex]?.columns;
  function addNewColumn() {
    const newData = [...dataState];
    newData[selectedBoardIndex]?.columns.push({
      id: Date.now(),
      title: `New Column`,
      tasks: [],
    });
    setDataState(newData);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );
  const tasksId = useMemo(() => {
    let tasksId: number[] = [];

    if (!columns || columns.length === 0) return tasksId;
    for (const column of columns) {
      tasksId = [
        ...tasksId,
        ...(column.tasks ?? [])
          .map((task) => task.id)
          .filter((id): id is number => id !== undefined),
      ];
    }

    return tasksId;
  }, [columns]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function dragEndHandler(e: any) {
    const { active, over } = e;
    const activeId = active?.id;
    const overId = over?.id;
    const activeColumnId = active?.data?.current.columnId;
    const overColumnId = over?.data?.current.columnId;
    if (activeId === overId) return;
    if (activeColumnId === overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === activeColumnId) {
          const activeIndex = column.tasks.findIndex(
            (task) => task.id === activeId,
          );
          const overIndex = column.tasks.findIndex(
            (task) => task.id === overId,
          );
          const newTasks = arrayMove(column.tasks, activeIndex, overIndex);
          return { ...column, tasks: newTasks };
        }
        return column;
      });

      const newData = [...dataState];
      newData[selectedBoardIndex].columns = newColumns;
      setDataState(newData);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function dragOverHandler(e: any) {
    const { active, over } = e;
    const activeId = active?.id;
    const activeColumnId = active?.data?.current?.columnId;
    const overColumnId = over?.data?.current?.columnId;
    if (overColumnId && overColumnId !== activeColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === overColumnId) {
          const activeTask = columns
            .find((column) => column.id === activeColumnId)
            ?.tasks.find((task) => task.id === activeId);
          const newTasks = [...column.tasks, activeTask].filter(
            (task): task is Task => task !== undefined,
          );
          return { ...column, tasks: newTasks };
        }
        if (column.id === activeColumnId) {
          const newTasks = column.tasks.filter((task) => task.id !== activeId);
          return { ...column, tasks: newTasks };
        }
        return column;
      });

      const newData = [...dataState];
      newData[selectedBoardIndex].columns = newColumns;
      setDataState(newData);
    }
  }
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={dragEndHandler}
        onDragOver={dragOverHandler}
      >
        <div className="flex min-h-[80vh] w-3/4 flex-wrap content-start justify-between gap-3 bg-violet2 p-3">
          <SortableContext
            items={tasksId}
            strategy={verticalListSortingStrategy}
          >
            {columns?.map((column, index) => (
              <Column
                key={column.id}
                title={column.title}
                tasks={column.tasks}
                id={column.id}
                columnIndex={index}
              />
            ))}
          </SortableContext>
          <button
            onClick={addNewColumn}
            className="h-fit rounded-lg bg-lines-light p-2 text-heading-s text-medium-grey sm:w-full md:w-[calc((100%-30px)/2)] lg:w-[calc((100%-30px)/3)]"
          >
            + New Column
          </button>
        </div>
      </DndContext>
    </>
  );
}
