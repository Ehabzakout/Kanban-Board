import { useEffect, useState } from "react";
import lightIcon from "../assets/light_mode_35dp_BLACK_FILL0_wght400_GRAD0_opsz40.svg";
import darkIcon from "../assets/bedtime_36dp_E8EAED_FILL0_wght400_GRAD0_opsz40.svg";
export default function Mode() {
  const [mode, setMode] = useState<string>("light");
  const local = localStorage.getItem("mode");
  useEffect(() => {
    if (local) {
      ModeHandler(local);
    }
  });
  function ModeHandler(theme: string) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mode", "dark");
      setMode("dark");
    }
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mode", "light");
      setMode("light");
    }
  }

  return (
    <>
      <div>
        {mode === "light" ? (
          <img
            src={lightIcon}
            className="h-5"
            onClick={() => ModeHandler("dark")}
          />
        ) : (
          <img
            src={darkIcon}
            className="h-5"
            onClick={() => ModeHandler("light")}
          />
        )}
      </div>
    </>
  );
}
