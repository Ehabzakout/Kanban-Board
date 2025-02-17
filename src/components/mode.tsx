import { useState } from "react";
import lightIcon from "../assets/light_mode_35dp_BLACK_FILL0_wght400_GRAD0_opsz40.svg";
import darkIcon from "../assets/bedtime_36dp_E8EAED_FILL0_wght400_GRAD0_opsz40.svg";
export default function Mode() {
  const [mode, setMode] = useState<string>("light");
  function ModeHandler() {
    if (mode === "light") {
      document.documentElement.classList.add("dark");
      setMode("dark");
    }
    if (mode === "dark") {
      document.documentElement.classList.remove("dark");
      setMode("light");
    }
  }
  return (
    <>
      <div onClick={ModeHandler}>
        {mode === "light" ? (
          <img src={lightIcon} className="h-5" />
        ) : (
          <img src={darkIcon} className="h-5" />
        )}
      </div>
    </>
  );
}
