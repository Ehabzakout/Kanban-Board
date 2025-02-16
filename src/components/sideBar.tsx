import clsx from "clsx";
import { useContext, useState } from "react";
import DialogDemo from "./Dialog";
import iconBoard from "../assets/icon-board.svg";
import { DataContext } from "../App";
import CreateBoard from "./createBoard";

export default function SideBar() {
  const { dataState, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <aside className="w-1/4 border border-t-0 border-lines/25 pt-4">
        <p className="mb-3 px-3 sm:text-[8px] sm:font-bold md:text-heading-s">
          All Board ({dataState.length})
        </p>
        <ul className="pr-4 font-bold sm:text-[8px] md:text-[10px]">
          {dataState.map((item, index) => (
            <li key={item.id}>
              <button
                onClick={() => setSelectedBoardIndex(index)}
                className={clsx(
                  "flex w-full gap-1 rounded-r-full text-start text-medium-grey data-[isactive=true]:hover:bg-violet3 data-[isactive=true]:hover:text-main-purple sm:p-1 md:p-3",
                  {
                    "bg-main-purple !text-white":
                      selectedBoardIndex === index && open === false,
                  },
                )}
                data-isactive={selectedBoardIndex !== index}
              >
                <img src={iconBoard} className="sm:hidden md:block" />
                {item.title}
              </button>
            </li>
          ))}
          <li>
            <DialogDemo
              title="Create New Board"
              open={open}
              setOpen={setOpen}
              triggerCompenet={
                <button
                  className={clsx(
                    "w-full rounded-r-full text-start text-main-purple data-[isactive=true]:hover:bg-violet3 data-[isactive=true]:hover:text-main-purple sm:p-1 md:p-3",
                    {
                      "bg-main-purple !text-white": open === true,
                    },
                  )}
                  data-isactive={open === false}
                >
                  <div className="flex gap-1">
                    <img src={iconBoard} className="sm:hidden md:block" />
                    <p>+ Create Board</p>
                  </div>
                </button>
              }
            >
              <CreateBoard toggleDialog={setOpen} />
            </DialogDemo>
          </li>
        </ul>
      </aside>
    </>
  );
}
