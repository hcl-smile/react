import React from "./src/mreact";
import ReactDOM from "./src/mreact-dom";

const Element = (
  <div id="element">
    <div style={{ width: 30, color: "#f00" }}>hello</div>
    world
  </div>
);

ReactDOM.render(Element, document.getElementById("root"));
