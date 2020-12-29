import React, { useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";
import { encode } from "js-base64";

function DoodleCanvas(props) {
  const { onSave, onClose } = props;

  const colors = {
    red: "red",
    blue: "blue",
    green: "green",
    black: "black",
    transparent: "transparent",
  };

  const [brushColor, setBrushColor] = useState(colors.black);
  const ref = React.createRef();

  const [isDrawDisabled, setIsDrawDisabled] = useState(true);
  const [coords, setCoords] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  const [rectangle, setRectangle] = useState([]);

  useEffect(() => {
    const { current } = ref;
    const { canvas } = current;
    if (current) {
      canvas.interface.onmousedown = (e) => {
        onMouseDown(e);
      };
      canvas.interface.onmouseup = (e) => {
        onMouseUp(e);
      };
    }
  }, [ref]);

  const onMouseDown = (event) => {
    if (rectangle.length > 0) {
      clearRectangle();
    }
    const newCoords = { ...coords, startX: event.x, startY: event.y };
    setCoords(newCoords);
  };

  const onMouseUp = (event) => {
    if (!isDrawDisabled) {
      const newCoords = { ...coords, endX: event.x, endY: event.y };
      const ctx = ref.current.canvas.interface.getContext("2d");
      ctx.beginPath();
      ctx.rect(
        newCoords.startX,
        newCoords.startY,
        newCoords.endX - newCoords.startX,
        newCoords.endY - newCoords.startY
      );
      ctx.stroke();
      setRectangle([
        {
          x: newCoords.startX,
          y: newCoords.startY,
          w: newCoords.endX - newCoords.startX,
          h: newCoords.endY - newCoords.startY,
        },
      ]);
    }
  };

  const clearRectangle = () => {
    const ctx = ref.current.canvas.interface.getContext("2d");
    ctx.clearRect(
      0,
      0,
      ref.current.canvas.interface.width,
      ref.current.canvas.interface.height
    );
  };

  const toggleDrawMode = () => {
    if (isDrawDisabled) {
      ref.current.canvas.interface.style.cursor = "crosshair";
      setBrushColor(colors.transparent);
    } else {
      ref.current.canvas.interface.style.cursor = "auto";
      setRectangle([]);
      setBrushColor(colors.green);
    }
    setIsDrawDisabled(!isDrawDisabled);
  };

  const saveData = async (data) => {
    const canvas = document.getElementById("canvas-editor");
    console.log(ref.current.getSaveData());
    const dup = document.documentElement.cloneNode(true);
    dup.querySelectorAll("script").forEach((script) => {
      script.parentNode.removeChild(script);
    });
    dup.querySelectorAll("#canvas-controls").forEach((controls) => {
      controls.parentNode.removeChild(controls);
    });

    const html = encode(dup.innerHTML);

    const dimensions = {
      viewport: {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      },
      page: {
        w: document.getElementsByTagName("body")[0].scrollWidth,
        h: document.getElementsByTagName("body")[0].scrollHeight,
      },
    };

    const elems = document.querySelectorAll("body *");
    const scrollPositions = [];
    elems.forEach((elem) => {
      scrollPositions.push({ top: elem.scrollTop, left: elem.scrollLeft });
    });

    const scroll = {
      window: {
        v: window.pageYOffset,
        h: window.pageXOffset,
      },
      elements: scrollPositions,
    };

    const requestData = {
      html,
      scroll,
      dimensions,
      origin: window.location.origin,
    };
    axios
      .post("http://localhost:8000/screenshot", requestData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    onClose();
  };

  const clearCanvas = () => {
    ref.current.clear();
  };

  const closeCanvas = () => {
    onClose();
  };

  const changeColor = (event) => {
    setBrushColor(colors[event.target.id]);
  };

  return (
    <div id="canvas-editor" className="canvas-editor">
      <div id="canvas-controls" className="canvas-controls">
        <div className="canvas-controls-container">
          <img
            src="https://www.svgrepo.com/show/179007/save-technology.svg"
            alt="save"
            onClick={saveData}
            width="36px"
          />
          <img
            src="https://www.svgrepo.com/show/52161/eraser.svg"
            onClick={clearCanvas}
            width="36px"
          />
          <img src={"marquee.svg"} onClick={toggleDrawMode} width="36px" />
          <img
            src="https://www.svgrepo.com/show/177793/error-close.svg"
            onClick={closeCanvas}
            width="36px"
          />
          <div
            id="black"
            onClick={changeColor}
            className={`color-button black ${
              brushColor === "black" ? "active-color" : ""
            }`}
          ></div>
          <div
            id="red"
            onClick={changeColor}
            className={`color-button red ${
              brushColor === "red" ? "active-color" : ""
            }`}
          ></div>
          <div
            id="green"
            onClick={changeColor}
            className={`color-button green ${
              brushColor === "green" ? "active-color" : ""
            }`}
          ></div>
          <div
            id="blue"
            onClick={changeColor}
            className={`color-button blue ${
              brushColor === "blue" ? "active-color" : ""
            }`}
          ></div>
        </div>
      </div>
      <CanvasDraw
        imgSrc={"transparent"}
        hideGrid={true}
        brushColor={brushColor}
        hideInterface={true}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default DoodleCanvas;
