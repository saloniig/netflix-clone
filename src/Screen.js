import React, { useState, useEffect } from "react";
import Preloader from "./Preloader";
import Home from "./Home";

function Screen() {
  const [screen, setScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => setScreen(true), 2000);
  });
  return (
    <div className="screen">
      {!screen && <Preloader />}
      {screen && <Home />}
    </div>
  );
}

export default Screen;
