import { ReactNode, SetStateAction } from "react";

export interface item {
  lable: string;
  onClick: VoidFunction;
  class: string;
}

export interface openDialog {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  triggerCompenet?: ReactNode;
  children: ReactNode;
  title?: string;
}
export interface Task {
  id?: number;
  title?: string;
  description?: string;
}

export interface Columns {
  id: number;
  title: string;
  tasks: Task[] | [];
}

export interface Board {
  id: number;
  title: string;
  columns: Columns[];
}
export interface sideData {
  data: Board[];
  selectedBoardIndex: number;
  setSelectedBoardIndex: React.Dispatch<SetStateAction<number>>;
}
