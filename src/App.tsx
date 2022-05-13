import React, { useState, useCallback, useEffect } from "react";
import { Canvas } from "./components/canvas/Canvas";
import { Toolbar } from "./components/toolbar/Toolbar";
import { useDraw } from "./hooks/usePainter";

const App = () => {
  const [dateUrl, setDataUrl] = useState("#");
  const [{ canvas, isReady, ...state }, { init, ...api }] = useDraw();

  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) return;

    setDataUrl(canvas.current.toDataURL("image/png"));
  }, [canvas]);

  const toolbarProps = { ...state, ...api, dateUrl, handleDownload };

  //initialising 
  useEffect(()=>{
    init();
  },[])

  return (
    <>
      <Toolbar {...toolbarProps} />
      <Canvas width={state.currentWidth} canvasRef={canvas} />
    </>
  );
};

export default App;
