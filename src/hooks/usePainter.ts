import { useCallback, useRef, useState } from "react";

export const useDraw = () => {
  const canvas = useRef<HTMLCanvasElement>() as any;
  const [isReady, setIsReady] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [isRect, setIsRect] = useState(false);
  const [isLine, setIsLine] = useState(false);

  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentWidth, setCurrentWidth] = useState(50);

  const undoSteps = useRef({}) as any;
  const redoStep = useRef({}) as any;
  const undo = useRef(0);
  const redo = useRef(0);

  const selectedColor = useRef("#000000");
  const selectedLineWidth = useRef(10);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const isDrawing = useRef(false);
  const isRegularPaintMode = useRef(true);
  const isEraserMode = useRef(false);
  const isRectMode = useRef(false);
  const isLineMode = useRef(false);
  const isRegularMode = useRef(true);

  const ctx: any = useRef(canvas?.current?.getContext("2d"));
  const ctxOverlay: any = useRef();

  const drawOnCanvas = (nativeEvent: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    if (!ctx || !ctx.current) {
      return;
    }

    if(isRegularMode.current){
      console.log("Regular mode")
      ctx.current.beginPath();
      ctx.current.moveTo(lastX.current, lastY.current);
      ctx.current.lineTo(offsetX, offsetY);
      ctx.current.stroke();
      [lastX.current, lastY.current] = [offsetX, offsetY];

    }
    // console.log(isRectMode)

     if(isRectMode.current){
      // console.log(ctx.current)
      // ctx.current.clearRect(0, 0, , 480);
      let width =    (offsetX-ctxOverlay.current.left);
       let height =  (offsetY-ctxOverlay.current.top); 
      //  ctx.current.clearRect(lastX.current-1,lastY.current-1, width, height);
       ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height);
       ctx.current.beginPath();
       ctx.current.strokeRect(offsetX, offsetY, width, height);
      console.log('stroking rect');
       [lastX.current, lastY.current] = [offsetX, offsetY];
       let lastWidth= width;
       let lastHeight= height;
      //  ctx.current.clearRect(offsetX,offsetY, lastWidth+10, lastHeight+10);
      //todo
      // ctx.current.stroke();
    }
    
    if(isLineMode.current){
      console.log('inside line');
      ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height);
      ctx.current.beginPath();
      ctx.current.moveTo(offsetX, offsetY);
      ctx.current.lineTo(lastX.current, lastY.current);
      ctx.current.stroke();
    }

    
    // console.log(undo, undoSteps)
    const temp = {
      ...undoSteps.current,
    } as any;

    temp[undo.current].push({ offsetX, offsetY }) as any;
    undoSteps.current = temp;
    // console.log(undoSteps);
  };

  const handleMouseDown = (e: any) => {
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
    const { offsetX, offsetY } = e;
    const temp = {
      ...undoSteps.current,
      [undo.current + 1]: [],
    };
    temp[undo.current + 1].push({ offsetX, offsetY });
    // console.log(undo, undoSteps.current) 
    undoSteps.current = temp;
    undo.current = undo.current + 1;
    // console.log(undo, undoSteps.current)
    isDrawing.current = true;
  };

  const handleUndo = () => {
    // console.log('undo called', undoSteps.current)
    if (undo.current > 0) {
      const data = undoSteps.current[undo.current];
      if (data && data.length == 0) {
        console.log(data);
        undo.current = undo.current + 1;
        redo.current = redo.current - 1;
        return;
      }
      // console.log('undo called', data)
      ctx.current.strokeStyle = "white";
      ctx.current.beginPath();
      ctx.current.lineWidth = selectedLineWidth.current + 1;
      ctx.current.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item: any, index: number) => {
        if (index !== 0) {
          ctx.current.lineTo(item.offsetX, item.offsetY);
          ctx.current.stroke();
        }
      });
      ctx.current.closePath();
      ctx.current.strokeStyle = "black";
      const temp = {
        ...undoSteps.current,
        [undo.current]: [],
      };
      const te = {
        ...redoStep.current,
        [redo.current + 1]: [...data],
      };
      undo.current = undo.current - 1;
      redo.current = redo.current + 1;
      redoStep.current = te;
      undoSteps.current = temp;
    }
  };

  const handleRedo = () => {
    if (redo.current > 0) {
      const data = redoStep.current[redo.current];
      if (data && data.length == 0) {
        console.log(data);
        undo.current = undo.current + 1;
        redo.current = redo.current - 1;
        return;
      }
      console.log("redo called", data);

      ctx.current.strokeStyle = "black";
      ctx.current.beginPath();
      ctx.current.lineWidth = selectedLineWidth.current;
      ctx.current.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item: any, index: number) => {
        if (index !== 0) {
          ctx.current.lineTo(item.offsetX, item.offsetY);
          ctx.current.stroke();
        }
      });

      ctx.current.closePath();
      const temp = {
        ...redoStep.current,
        [redo.current]: [],
      };

      redoStep.current = temp;
      const te = {
        ...undoSteps.current,
        [undo.current + 1]: [...data],
      };

      undoSteps.current = te;
    }
  };

  const drawNormal = (e: any) => {
    if (!isDrawing.current || !ctx.current) return;

    if (isRegularPaintMode.current || isEraserMode.current) {
      
      ctx.current.strokeStyle = selectedColor.current;

      setCurrentColor(selectedColor.current);
      ctx.current.lineWidth = selectedLineWidth.current;
      console.log(isEraserMode.current)
      isEraserMode.current
        ? (ctx.current.globalCompositeOperation = "destination-out")
        : (ctx.current.globalCompositeOperation = "source-over");

    }

    drawOnCanvas(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const init = () => {

    ctx.current = canvas?.current?.getContext("2d");
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener("mousedown", handleMouseDown);
      canvas.current.addEventListener("mousemove", drawNormal);
      canvas.current.addEventListener("mouseup", stopDrawing);
      canvas.current.addEventListener("mouseout", stopDrawing);

      const width = prompt('Please enter canvas width')
      const height = prompt('Please enter canvas height')
      if(width && height) {
      canvas.current.width = width;
      canvas.current.height = height;
     }
     else { 
       window.alert('Cant initialise with empty dimensions, try again later.');
       return;
     }
       
      ctxOverlay.current= canvas.current?.getBoundingClientRect()

      ctx.current.strokeStyle = "#000";
      ctx.current.lineJoin = "round";
      ctx.current.lineCap = "round";
      ctx.current.lineWidth = 10;
      setIsReady(true);
      setCurrentWidth(15);
      console.log("init called");
    }
  };

  const handleColor = (e: any) => {
    setCurrentColor(e.currentTarget.value);
    selectedColor.current = e.currentTarget.value;
    isEraserMode.current=false;
  };

  const handleWidth = (e: any) => {
    setCurrentWidth(e.currentTarget.value);
    selectedLineWidth.current = e.currentTarget.value;
  };

  const handleClear = () => {
    if (!ctx || !ctx.current || !canvas || !canvas.current) {
      return;
    }
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  const handleRegularMode = () => {
    isRegularPaintMode.current = true;
    isRegularMode.current=true;
    
    setIsEraser(false);
    setIsRect(false);
    setIsLine(false);
    isLineMode.current = false;
    isRectMode.current=false;
    isEraserMode.current = false;
    
  };

  const handleEraserMode = () => {
    isEraserMode.current = true;
    setIsEraser(true);
   

    setIsRect(false);
    isRegularMode.current=true;
    setIsLine(false);
    isLineMode.current = false;
    isRectMode.current=false;
    isRegularPaintMode.current =true;
  };

  const handleRectMode = () => {  
    isRectMode.current = true;
    setIsRect(true);

    isRegularMode.current=false;
    setIsLine(false);
    setIsEraser(false);
    isLineMode.current = false;
    isRegularPaintMode.current = true;
    isEraserMode.current = false;
    console.log('rect called', isLineMode.current,
    isEraserMode.current)
  };

  const handleLineMode = () => {

    setIsLine(true);
    isLineMode.current = true;
    isRegularPaintMode.current=true

    setIsRect(false);
    isRegularMode.current=false;
    setIsLine(false);
    setIsEraser(false);
    isRectMode.current=false;
  
   

  };

  return [
    {
      canvas,
      isReady,
      currentWidth,
      currentColor,
      isRegularMode,
      isEraser,
      isRect,
      isLine,
      undo,
      redo,
    },
    {
      init,
      handleRegularMode,
      handleColor,
      handleWidth,
      handleClear,
      handleEraserMode,
      handleUndo,
      handleRedo,
      handleRectMode,
      handleLineMode,
    },
  ] as any;
};
