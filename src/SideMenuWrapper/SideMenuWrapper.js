import React, { useState } from "react";

import {SideMenu} from '../styles/SideMenu.styled'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spin as Hamburger } from 'hamburger-react'

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
    deactivateZoom,
    onProvinceLayer,
    onBasinLayer,
    onDepartmentLayer,
    showDepartmentLayer,
    showProvinceLayer,
    showBasinLayer
  }) => {

  const opacityHandler = (data) => {
    deactivateZoom()
    opacity_wms(Number(data));
  }
  const opacityHandlerEvents = (data) => {
    deactivateZoom()
    opacity_vector(Number(data));
  }
  const opacityHandlerRivers = (data) => {
    deactivateZoom()
    opacity_rivers(Number(data));
  }
  const [isOpen, setOpen] = useState(false)

  return(
    
      <SideMenu>
        <div className="wrapper_absolute">
         <div className="Myhamburguer">
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        </div>
          {
            isOpen && 
            <div>
            <p className="sudo_title">
              Landslides Events
              <input
              type="checkbox"
              checked={layer}
              onChange={(event) => onLayer(event)}
              className="cm-toggle"
            /> 
            </p>
            <div className="mycontainer giveSpace">
              
              <p className="prompt">Event Date</p>
              <div>
              <DropdownButton 
                id="dropdown-button-dark-example2"
                variant="light"
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
    
            </div>
    
    
            <div className="mycontainer">
              <span className="prompt">Opacity</span>
              <div className="buble"> 
                  {vector_op_val}
              </div>
              <div className="slider-parent">
                  <input className= "slider-class" type="range" min="0" max="1"  step="0.1" value={vector_op_val}
                    onChange={({ target: { value: radius } }) => {
                      opacityHandlerEvents(radius);
                              }}
                  />
              </div>
            </div>
            <div className="mycontainer">
              <div className='my-legend'>
                <div className='legend-title'><p>Event Warning Level</p></div>
                <div className='legend-scale'>
                  <ul className='legend-labels'>
                    <li><span style={{background:'#ff0000'}}></span>Red Warning</li>
                    <li><span style={{background:'#ffa500'}}></span>Orange Warning</li>
                    <li><span style={{background:'#ffff00'}}></span>Yellow Warning</li>
                  </ul>
                </div>
    
              </div>
            </div>
    
    
            <div className="mainContainer">
            <p className="sudo_title">
              Landslides Zones
              <input
              type="checkbox"
              checked={layer_zones}
              onChange={(event) => onLayerZones(event)}
              className="cm-toggle"
            /> 
            </p>
            <div className="mycontainer">
              <span className="prompt">Opacity</span>
              <div className="buble"> 
                  {wms_op_val}
              </div>
              <div className="slider-parent">
                  <input className= "slider-class" type="range" min="0" max="1"  step="0.1" value={wms_op_val}
                    onChange={({ target: { value: radius } }) => {
                                opacityHandler(radius);
                              }}
                  />
              </div>
            </div> 
    
    
            </div>
    
            <div className="mainContainer">
            <p className="sudo_title">
              GEOGLoWS Drainage Line
              <input
              type="checkbox"
              checked={layer_river}
              onChange={(event) => onLayerRiver(event)}
              className="cm-toggle"
            /> 
            </p>
            <div className="mycontainer">
              <span className="prompt">Opacity</span>
              <div className="buble"> 
                  {river_op_val}
              </div>
              <div className="slider-parent">
                  <input className= "slider-class" type="range" min="0" max="1"  step="0.1" value={river_op_val}
                    onChange={({ target: { value: radius } }) => {
                      opacityHandlerRivers(radius);
                              }}
                  />
              </div>
            </div> 
    
            </div>
    
    
            <p className="sudo_title">
              Boundaries
            </p>
    
    
            <div className="mycontainer giveSpace">
              <div className="spacer_cont">
                <span className="prompt">
                  Departments
                </span>
              </div>
              <div className="spacer_cont">
                <input
                type="checkbox"
                checked={showDepartmentLayer}
                onChange={(event) => onDepartmentLayer(event)}
                className="cm-toggle"
                /> 
              </div>
            </div>
            <div className="spacer_cont">
    
              <DropdownButton 
                id="dropdown-button-dark-example2"
                variant="light"
                menuVariant="dark"
                title={actual_department}
                // className="mt-2"
                size= 'sm'
                onSelect={(event) => onDepartmentChange(event)}
                
              >
              {departments.map((department, index) => (
                
                <Dropdown.Item  eventKey={department} key={index}>{department}</Dropdown.Item>
              ))}
              </DropdownButton>   
              </div>
    
            <div className="mycontainer giveSpace">
            <div className="spacer_cont">
                <span className="prompt">Provinces</span>
    
              </div>
            <div className="spacer_cont">
              <input
                type="checkbox"
                checked={showProvinceLayer}
                onChange={(event) => onProvinceLayer(event)}
                className="cm-toggle"
                /> 
            </div>
    
    
    
            </div>
            <div className="spacer_cont">
              <DropdownButton 
                id="dropdown-button-dark-example2"
                variant="light"
                menuVariant="dark"
                title={actual_province.split(" ")[1]?.toLowerCase()}
                size= 'sm'
                onSelect={(event) => onProvinceChange(event)}
              >
              {provinces.map((province, index) => (
                
                <Dropdown.Item  eventKey={province} key={index}>{province.split(" ")[1]?.toLowerCase()}</Dropdown.Item>
              ))}
              </DropdownButton>    
              </div>
    
            <div className="mycontainer giveSpace">
              <div className="spacer_cont">
                <span className="prompt">Basins</span>
    
              </div>
              <div className="spacer_cont">
                <input
                type="checkbox"
                checked={showBasinLayer}
                onChange={(event) => onBasinLayer(event)}
                className="cm-toggle"
                /> 
              </div>
    
    
     
            </div>
            <div className="spacer_cont">
                <DropdownButton 
                  id="dropdown-button-dark-example2"
                  variant="light"
                  menuVariant="dark"
                  title={actual_basin}
                  size= 'sm'
                  onSelect={(event) => onBasinChange(event)}
                >
                {basins.map((basin, index) => (
                  
                  <Dropdown.Item  eventKey={basin} key={index}>{basin}</Dropdown.Item>
                ))}
                </DropdownButton>   
    
              </div>
            </div>
          }


        </div>        

      </SideMenu>


  );
};

export default SideMenuWrapper;