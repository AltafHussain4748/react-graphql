import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Grid from "./Grid";

const PopupGrid = () => (
  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    <Grid />
  </Popup>
);

export default PopupGrid;
