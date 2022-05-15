import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Canvas } from "./components/canvas/Canvas";
import Navbar from './components/navbar/Navbar';
import { Toolbar } from "./components/toolbar/Toolbar";
import { useDraw } from "./hooks/usePainter";



const App = () => {
  const dataUrl = useRef('#'); 
  const [{ canvas, isReady, ...state }, { init, ...api }] = useDraw();

  const handleDownload = useCallback(() => {
    console.log('download called', dataUrl.current);
    if (!canvas || !canvas.current) return;
    dataUrl.current=canvas.current.toDataURL("image/png");
    console.log('download called', dataUrl.current);
  }, [canvas]);

  const toolbarProps = { ...state, ...api, dataUrl, handleDownload };
  const navbarProps = { ...state, init,...api, dataUrl, handleDownload };

  //initialising 
  useEffect(()=>{
    init();
  },[])

  return (
    < >
      <Navbar {...navbarProps} />
      <Toolbar {...toolbarProps} />
      <Canvas width={state.currentWidth} canvasRef={canvas} />
      
    </>
  );
};

export default App;
