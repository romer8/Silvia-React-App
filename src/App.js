import React, { useState, useEffect } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { vector,xyz } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import TileWMS from 'ol/source/TileWMS';

import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";

import mapConfig from "./config.json";
import "./App.css";
import axios from 'axios';

import {ContainerFlex} from './styles/ContainerMain.styled'
import SideMenuWrapper from "./SideMenuWrapper/SideMenuWrapper";


const App = () => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(mapConfig.zoom);
  const [showLayer1, setShowLayer1] = useState(true);
  const [loading, setLoading] = useState(true);
  const [floodLayer, setFloodLayer] = useState(
    {
      "type": "FeatureCollection",
      "crs": {
          "type": "name",
          "properties": {
              "name": "EPSG:4326"
          }
      },
      "features": []
    }
  );
  const [datesFlood, setDatesFlood]= useState([]);
  const [actualDate, setActualDate]= useState('');
  const [opacityLayer, SetOpacityLayer]= useState(0.4);

  const changeStyle = (date) =>{
    setShowLayer1(false)
    setActualDate(date);
  }

  const onOffLayer = (event) =>{
    setShowLayer1(event.target.checked)
  }

const getStyle = (feature) => {
    const floodindex = feature.get('flood');

    if(floodindex === 2){
      return FeatureStyles.SecondLevel
    }
    if(floodindex === 3){
      return FeatureStyles.ThirdLevel
    }
    if(floodindex === 4){
      return FeatureStyles.FourthLevel
    }
    
  }
  // Adding the wms layer to the map
  useEffect(() => {
    console.log("useEffect app.js 3");

    const service_link_dates = 'http://127.0.0.1:8000/apps/silvia/dates/';

    const fetchDates = async () =>{
      try {
          const {data: response} = await axios.get(service_link_dates);
          console.log(response)
          setDatesFlood(response['dates'])
          setActualDate(response['dates'][0])
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchDates();
  
  }, [])

  useEffect(() => {
    console.log(actualDate);

    const Mydata = {
      'date': actualDate
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const service_link = 'http://127.0.0.1:8000/apps/silvia/floods/';
    const fetchDataFlood = async () =>{
      try {
        if(actualDate !==''){
          const {data: response} = await axios.post(service_link,Mydata,config);
          console.log("useEffect app.js 1");
          console.log(response)
          setFloodLayer(response)
          setLoading(false);
          setShowLayer1(true)
        }

        // if(loading && actualDate !==''){
        //   const {data: response} = await axios.post(service_link,Mydata,config);
        //   console.log("useEffect app.js 1");
        //   console.log(response)
        //   setFloodLayer(response)
        //   setLoading(false);
        //   setShowLayer1(true)
        // }
        // else{
        //   console.log(Mydata);
        //   const {data: response} = await axios.post(service_link,Mydata,config);
        //   console.log("useEffect app.js 2");
        //   console.log(response)
        //   setFloodLayer(response)
        //   setShowLayer1(true)
        // }

      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchDataFlood();

	}, [actualDate]);
  

  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (
      <ContainerFlex>
        <SideMenuWrapper 
          style = {changeStyle}
          onLayer = { onOffLayer}
          layer = {showLayer1}
          dates = {datesFlood}
          actual_date={actualDate}
          opacity_wms = {SetOpacityLayer}
          wms_op_val = {opacityLayer}
        />

        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer 
              layerClass={"base_layer"}
            
              source={xyz(
                {
                  attributions:
                  'Tiles ?? <a href="https://services.arcgisonline.com/ArcGIS/' +
                  'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                  url:
                  'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                  'World_Imagery/MapServer/tile/{z}/{y}/{x}',
                }
            )} zIndex={0} />
              <TileLayer 
              layerClass={"wms_layer"}
              source={new TileWMS({
                url: 'https://geoserver.hydroshare.org/geoserver/HS-22714855232d44198d12aa4109ec8478/wms',
                params: { 'LAYERS': 'GEOGLOWS_SilviaV3' },
                serverType: 'geoserver',
                crossOrigin: 'Anonymous'
              })} 
              opacity={opacityLayer}
              zIndex={1}
            />
            {showLayer1 && (
                <VectorLayer
                source={vector({
                  features: new GeoJSON().readFeatures(floodLayer, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })}
                style={function(feature){
                  return getStyle(feature)
                }}
                zIndex={2}

              />
            )}

          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>


      </ContainerFlex>
    )}

    </div>
  );
};

export default App;
