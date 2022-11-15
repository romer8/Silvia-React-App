import React from "react";
import {SideMenu} from '../styles/SideMenu.styled'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";

const SideMenuWrapper = ({ style, onLayer,layer,dates,actual_date,opacity_wms,wms_op_val,opacity_vector,vector_op_val, opacity_rivers, river_op_val, layer_river, onLayerRiver, layer_zones, onLayerZones}) => {

  const opacityHandler = (data) => {

    opacity_wms(data);
  }
  const opacityHandlerEvents = (data) => {
    
    opacity_vector(Number(data));
  }
  const opacityHandlerRivers = (data) => {
    
    opacity_rivers(Number(data));
  }

  return(
    
      <SideMenu>
        <div className="wrapper_absolute">
        <p className="sudo_title">
          Landslides Events
        </p>
        <div className="mycontainer">
          
          <p className="prompt">Select Date</p>
          <DropdownButton 
            id="dropdown-button-dark-example2"
            variant="secondary"
            menuVariant="dark"
            title={actual_date}
            // className="mt-2"
            size= 'lg'
            onSelect={(event) => style(event)}
          >
          {dates.map((date, index) => (
            
            <Dropdown.Item  eventKey={date} key={index}>{date}</Dropdown.Item>
          ))}
          </DropdownButton>    
        </div>
        <input
          type="checkbox"
          checked={layer}
          onChange={(event) => onLayer(event)}
          className="input_name"
        /> 
        <span>Hide/show</span>

        <div className="mycontainer">
          <p className="prompt">Contrast</p>
          <div className="buble"> 
              {vector_op_val}
          </div>
          <div className="slider-parent">
              <input type="range" min="0" max="1"  step="0.1" value={vector_op_val}
                onChange={({ target: { value: radius } }) => {
                  opacityHandlerEvents(radius);
                          }}
              />
          </div>
        </div> 


        <div className="mainContainer">
        <p className="sudo_title">
          Landslides Zones
        </p>
        <div className="mycontainer">
          <p className="prompt">Contrast</p>
          <div className="buble"> 
              {wms_op_val}
          </div>
          <div className="slider-parent">
              <input type="range" min="0" max="1"  step="0.1" value={wms_op_val}
                onChange={({ target: { value: radius } }) => {
                            opacityHandler(radius);
                          }}
              />
          </div>
        </div> 
        <input
          type="checkbox"
          checked={layer_zones}
          onChange={(event) => onLayerZones(event)}
          className="input_name"
        /> 
        <span>Hide/show</span>

        </div>

        <div className="mainContainer">
        <p className="sudo_title">
          GEOGLoWS Drainage Line
        </p>
        <div className="mycontainer">
          <p className="prompt">Contrast</p>
          <div className="buble"> 
              {river_op_val}
          </div>
          <div className="slider-parent">
              <input type="range" min="0" max="1"  step="0.1" value={river_op_val}
                onChange={({ target: { value: radius } }) => {
                  opacityHandlerRivers(radius);
                          }}
              />
          </div>
        </div> 

        </div>
        <input
          type="checkbox"
          checked={layer_river}
          onChange={(event) => onLayerRiver(event)}
          className="input_name"
        /> 
        <span>Hide/show</span>

        </div>        

      </SideMenu>


  );
};

export default SideMenuWrapper;