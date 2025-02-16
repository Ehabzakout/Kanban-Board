import Header from "./components/header";
import SideBar from "./components/sideBar";
import WorkSpace from "./components/workspace";
import { createContext, useEffect, useState } from "react";
import { Board } from "./interfaces";
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext({
  dataState: [] as Board[],
  selectedBoardIndex: 0,
  setSelectedBoardIndex: (_index: number) => {}, // eslint-disable-line
  setDataState: (_data: Board[]) => {}, // eslint-disable-line
});

function App() {
  const [dataState, setDataState] = useState<Board[]>([]);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0);
  useEffect(() => {
    const localData = localStorage.getItem("data");
    if (localData) {
      setDataState(JSON.parse(localData));
    }
  }, []);
  useEffect(() => {
    if (!dataState.length) return;
    localStorage.setItem("data", JSON.stringify(dataState));
  }, [dataState]);
  return (
    <>
      <DataContext.Provider
        value={{
          dataState,
          selectedBoardIndex,
          setSelectedBoardIndex,
          setDataState,
        }}
      >
        <div className="container">
          <div className="font-jakatra">
            <Header />
            <div className="flex">
              <SideBar />
              <WorkSpace />
            </div>
          </div>
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
