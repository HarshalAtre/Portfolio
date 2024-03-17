import React from 'react'
import "./All.css"
function Eye() {
    var balls =document.getElementsByClassName("ball");
    document.onmousemove = function(e){
    var x=e.clientX*100/window.innerWidth+"%";
    var y=e.clientY*100/window.innerHeight+"%";
    for(var i=0;i<2 ;i++){
        balls[i].style.left=x;
        balls[i].style.top=y;
        balls[i].style.transform=`translate(-${x},-${y})`;
    }
    }
  return (
    <div>
        <div className="eyes">
            <div className="eye">
                <div className="ball"></div>
            </div>
            <div className="eye">
                <div className="ball"></div>
            </div>
        </div>
    </div>
  )
}

export default Eye