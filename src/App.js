import "./App.css";
import React, { useState } from "react";
import DoodleCanvas from "./DoodleCanvas";
import DemoPage from "./DemoPage";
import "antd/dist/antd.css";
function App() {
  const [canvas, setCanvas] = useState(null);
  const takeScreenshot = () => setCanvas(true);

  const saveData = () => {};

  const onClose = () => {
    setCanvas(null);
  };
  return (
    <>
      <div className="App">
        <DemoPage />
      </div>
      <img
        id="fab"
        src="https://www.svgrepo.com/show/48395/photo-camera.svg"
        className="fab"
        onClick={takeScreenshot}
      />
      {canvas && (
        <DoodleCanvas
          canvasWidth={"100vw"}
          canvasHeight={"100vh"}
          brushRadius={3}
          onSave={saveData}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default App;
