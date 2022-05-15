import {
  faEraser,
  faPaintBrush,
  faPen,
  faSquare,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

import './Toolbar.css';

export const Toolbar: React.FC<any> = ({
  handleClear,
  handleEraserMode,
  handleRegularMode,
  handleColor,
  handleWidth,
  handleUndo,
  handleRedo,
  handleLineMode,
  handleRectMode,
  isRegularMode,
  isEraser,
  isRect,
  isLine,
  undo,
  redo,
  
}) => {
  return (
    <>
    <div className= "toolbar">
    <button className="btn btn--block"  disabled={undo === 0}onClick={handleUndo}>
          Undo
        </button>
        <br></br>
        <button className="btn btn--block"  disabled={redo === 0} onClick={handleRedo}>
          Redo
        </button>
        <br></br>
        <button className="btn btn--block" onClick={handleClear}>
          Clear
        </button>
      
      <div>

        <div className="tool-section tool-section--lrg tool-container">       


        <div className="tool-section">
          <small>
            <strong>Tools</strong>
          </small>
        </div>


        {/* paint brush */}
        <div className="tool-grid tool-section tool-section--lrg">
          <div>
            <button
              className={`btn btn--tool ${
                isRegularMode.current && !isEraser ? "btn--active" : ""
              }`}
              onClick={handleRegularMode}
             
            >
              <FontAwesomeIcon icon={faPaintBrush} />
            </button>
          </div>

          {/* eraser */}
          <div>
            <button
              className={`btn btn--tool ${
                isEraser ? "btn--active" : ""
              }`}
              onClick={handleEraserMode}
             
            >
             <FontAwesomeIcon icon={faEraser} />
            </button>
          </div>

           {/* rectangle */}    
          <div>
            <button
              className={`btn btn--tool ${
                isRect ? "btn--active" : ""
              }`}
              onClick={handleRectMode}
              
            >
              <FontAwesomeIcon icon={faSquare} />
            </button>
          </div>

           {/* line */}    
           <div>
            <button
              className={`btn btn--tool ${
                isLine ? "btn--active" : ""
              }`}
              onClick={handleLineMode}
             
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>

        </div>
        
          <div className="tool-section tool-section--lrg">
            <div className="tool-section">
              <small>
                <strong>Brush size</strong>
              </small>
            </div>
            <div className="tool-section">
              <input
                defaultValue="15"
                type="range"
                min="10"
                max="90"
                onChange={handleWidth}
              />
            </div>
          </div>
        
        {/* { (
          <div className="tool-section tool-section--lrg"></div>
        )} */}

         {/* color */}
         <div className="tool-section">
            <small>
              <strong>Select Color</strong>
            </small>
          </div>
          <input
            className="btn--color"
            type="color"
            id="toolColorPicker"
            onChange={handleColor}
          />
        </div>
      </div>

      


      <div>
      </div>
    </div>
    </>
  );
};
