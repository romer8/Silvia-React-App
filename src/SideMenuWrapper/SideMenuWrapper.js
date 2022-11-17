import React from "react";
import {SideMenu} from '../styles/SideMenu.styled'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";

const SideMenuWrapper = (
  { 
    style, 
    onLayer,
    layer,
    dates,
    actual_date,
    opacity_wms,
    wms_op_val,
    opacity_vector,
    vector_op_val, 
    opacity_rivers, 
    river_op_val, 
    layer_river, 
    onLayerRiver, 
    layer_zones, 
    onLayerZones,
    actual_department,
    departments, 
    onDepartmentChange,
    actual_province,
    provinces, 
    onProvinceChange,
    actual_basin,
    basins, 
    onBasinChange,
    deactivateZoom
  }) => {

  const opacityHandler = (data) => {
    deactivateZoom()
    opacity_wms(data);
  }
  const opacityHandlerEvents = (data) => {
    deactivateZoom()
    opacity_vector(Number(data));
  }
  const opacityHandlerRivers = (data) => {
    deactivateZoom()
    opacity_rivers(Number(data));
  }

  return(
    
      <SideMenu>
        <div className="wrapper_absolute">
        <p className="sudo_title">
          Landslides Events
        </p>
        <div className="mycontainer">
          
          <p className="prompt">Event Date</p>
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
          className="cm-toggle"
        /> 
        <span>Hide/show</span>

        <div className="mycontainer">
          <p className="prompt">Opacity</p>
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

        <div className='my-legend'>
          <div className='legend-title'><p>Event Warning Level</p></div>
          <div className='legend-scale'>
            <ul className='legend-labels'>
              <li><span style={{background:'#ff0000'}}></span>Red Warning</li>
              <li><span style={{background:'#ffa500'}}></span>Orange Warning</li>
              <li><span style={{background:'#ffff00'}}></span>Yellow Warning</li>
            </ul>
          </div>
          <br></br>
          <div className='legend-source'>Source: <a href="https://www.senamhi.gob.pe/?p=monitoreo-silvia">Senamhi/Silvia</a></div>
        </div>


        <div className="mainContainer">
        <p className="sudo_title">
          Landslides Zones
        </p>
        <div className="mycontainer">
          <p className="prompt">Opacity</p>
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
          className="cm-toggle"
        /> 
        <span>Hide/show</span>

        </div>

        <div className="mainContainer">
        <p className="sudo_title">
          GEOGLoWS Drainage Line
        </p>
        <div className="mycontainer">
          <p className="prompt">Opacity</p>
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
          className="cm-toggle"
        /> 
        <span>Hide/show</span>

        <p className="sudo_title">
          Boundaries
        </p>
        <div className="mycontainer">
          
          <p className="prompt">Departments</p>
          <DropdownButton 
            id="dropdown-button-dark-example2"
            variant="secondary"
            menuVariant="dark"
            title={actual_department}
            // className="mt-2"
            size= 'lg'
            onSelect={(event) => onDepartmentChange(event)}
          >
          {departments.map((department, index) => (
            
            <Dropdown.Item  eventKey={department} key={index}>{department}</Dropdown.Item>
          ))}
          </DropdownButton>    
        </div>
        <div className="mycontainer">
          
          <p className="prompt">Provinces</p>
          <DropdownButton 
            id="dropdown-button-dark-example2"
            variant="secondary"
            menuVariant="dark"
            title={actual_province.split(" ")[1]}
            // className="mt-2"
            size= 'lg'
            onSelect={(event) => onProvinceChange(event)}
          >
          {provinces.map((province, index) => (
            
            <Dropdown.Item  eventKey={province} key={index}>{province.split(" ")[1]}</Dropdown.Item>
          ))}
          </DropdownButton>    
        </div>

        <div className="mycontainer">
          
          <p className="prompt">Basins</p>
          <DropdownButton 
            id="dropdown-button-dark-example2"
            variant="secondary"
            menuVariant="dark"
            title={actual_basin.split(" ")[1]}
            // className="mt-2"
            size= 'lg'
            onSelect={(event) => onBasinChange(event)}
          >
          {basins.map((basin, index) => (
            
            <Dropdown.Item  eventKey={basin} key={index}>{basin.split(" ")[1]}</Dropdown.Item>
          ))}
          </DropdownButton>    
        </div>

        </div>        

      </SideMenu>


  );
};

export default SideMenuWrapper;