import React from "react";
function ReactIf({ children, condition, Or=<div></div>  }) {
  return <> {condition ? children : Or} </>;
}

export default ReactIf;
