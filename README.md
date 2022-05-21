# Paint APP

Simple paint app made with React, custom hooks, Canvas API

## Demo

https://hitesh-c.github.io/paint-app/

## How to start:

1. install packages by Yarn Install
2. it may also require typescript in your system folder

## Resources used:

https://www.geeksforgeeks.org/how-to-create-a-paint-app-in-reactjs/

https://stackoverflow.com/questions/64611155/canvas-freehand-drawing-undo-and-redo-functionality-in-reactjs

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

https://www.w3schools.com/tags/ref_canvas.asp


## For undo functionality, 
i created a object which store array { undoSteps } of coordinates.
i also keep track on { undo } 
when undo button is clicked, it take out { data } object via undoSteps[undo]
as data is array of cordinates,

we only need to retrace on data.

 data.forEach((item: any, index: number) => {
        if (index !== 0) {
          ctx.current.lineTo(item.offsetX, item.offsetY);
          ctx.current.stroke();
        }
      });

after undo, we push in { redoSteps } and increment in { redo } 

For redo functionality, same happens in redoSteps[redo]

## Problem faced :
many :-( , but resolved by debugging


