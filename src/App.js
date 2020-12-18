import "./App.css";
import React, { useState } from "react";
import * as h2c from "html2canvas";
import DoodleCanvas from "./DoodleCanvas";
import DemoPage from "./DemoPage";
import { downloadBlob } from "./helpers";

function App() {
  const [canvas, setCanvas] = useState(null);
  const takeScreenshot = async () => {
    console.log(window.pageYOffset);
    const h2cOptions = {
      height: window.innerHeight,
      scrollY: 0 - window.pageYOffset,
      allowTaint: false,
      ignoreElements: (element) => {
        return element.id === "fab" && true;
      },
    };

    let capture = await h2c(document.body, h2cOptions);
    setCanvas(capture);
    /* capture.toBlob((blob) => {
      downloadBlob(blob, "original.png");
    }); */
  };

  const saveData = (data) => {
    console.log(data);
  };

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
          imgSrc={canvas.toDataURL()}
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
