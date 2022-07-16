import React from 'react';
import './Navbar.css';

const Navbar: React.FC<any> = ({
    handleDownload,
    dataUrl,
    init,
  
  }) => {

    const download=()=>{
      console.log('downloading', dataUrl.current);
        const a = document.createElement('a');
        a.href = dataUrl.current;
        a.download = "image.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleNew = () =>{
      const save = window.confirm("Do you want to save ?");
      console.log(dataUrl.current);
      if(save){
        download();
            }
    }

  return (
    <>
      <div className="topnav" style = {{ width : window.innerWidth }}>
        <a className="active" >
         WHITEBOARD
        </a>
        <a 
          onClick={ ()=>{
            handleDownload();
            handleNew();
            init();
          }}
          
        >New
        </a>

        <a
          onClick={ ()=>{
            handleDownload();
            handleNew();
          }}
          href={dataUrl.current}
        >
          Save
        </a>
        <a href="https://github.com/hitesh-c/paint-app">Info</a>
      </div>
      </>
  );
}

export default Navbar;
