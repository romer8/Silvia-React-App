import React from "react";
import {SideMenu} from '../styles/SideMenu.styled'
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const SideMenuWrapper = ({ style, onLayer,layer,dates }) => {


  const handleSelect=(e)=>{
    console.log(e);
  }
  return(
    
      <SideMenu>
        <h4>Modelo Silvia</h4>

        <input
            type="checkbox"
            checked={layer}
            onChange={(event) => onLayer(event)}
        />
        Hide/Show
        <DropdownButton 
            id="dropdown-button-dark-example2"
            variant="secondary"
            menuVariant="dark"
            title="Selecciona una Fecha"
            className="mt-2"
            size= 'sm'
            onSelect={(event) => style(event)}
        >
        {dates.map((date, index) => (
          
          <Dropdown.Item  eventKey={date} key={index}>{date}</Dropdown.Item>
        ))}
        </DropdownButton>

      </SideMenu>


  );
};

export default SideMenuWrapper;