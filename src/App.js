import React, { useState, useEffect, useRef } from "react";
import Map from "./Map";

import Modal from "./Modals/modal";

import { Layers, TileLayer, VectorLayer } from "./Layers";
import { vector,xyz,osm } from "./Source";
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
  const modal = useRef(null);
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(mapConfig.zoom);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showRiverLayer, setShowRiverLayer] = useState(false);
  const [showDepartmentLayer, setShowDepartmentLayer] = useState(false);
  const [showProvinceLayer, setShowProvinceLayer] = useState(false);
  const [showBasinLayer, setShowBasinLayer] = useState(false);

  const [showZonesLayer, setShowZonesLayer] = useState(true);
  const [actualDepartment, setActualDepartment] = useState('');
  const [actualBasin, setActualBasin] = useState('');
  const [actualProvince, setActualProvince] = useState('');

  const [departments, setDepartments]= useState([]);
  const [provinces, setProvinces]= useState([]);
  const [basins, setBasins] = useState([])

  const [isZoomDepartment, setIsZoomDepartment] = useState(false)
  const [isZoomEvent, setIsZoomEvent] = useState(true)

  const [isZoomProvinces, setIsZoomProvinces] = useState(false)
  const [isZoomBasins, setIsZoomBasins] = useState(false)

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
  const [departmentLayer, setDepartmentLayer] = useState(
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

  const [provinciasLayer, setProvinciasLayer] = useState(
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
  const [basinLayer, setBasinLayer] = useState(
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
  const [opacityVectorLayer, setOpacityVectorLayer]= useState(1);
  const [opacityRiverLayer, setOpacityRiverLayer]= useState(0.3);

  const changeStyle = (date) =>{
    setShowLayer1(false)
    setActualDate(date);
    setIsZoomEvent(true)
    setIsZoomDepartment(false);
    setIsZoomProvinces(false)
    setIsZoomBasins(false);

  }
  const changeDepartment = (dp) =>{
    setActualDepartment(dp);
    setIsZoomDepartment(true);
    setIsZoomEvent(false);
    setIsZoomProvinces(false);
    setIsZoomBasins(false);

  }

  const changeProvinces = (prov) =>{
    setActualProvince(prov);
    setIsZoomDepartment(false);
    setIsZoomEvent(false);
    setIsZoomProvinces(true);
    setIsZoomBasins(false);
    setShowProvinceLayer(true);

  }
  const changeBasins = (bas) =>{
    setActualBasin(bas);
    setIsZoomDepartment(false);
    setIsZoomEvent(false);
    setIsZoomProvinces(false);
    setIsZoomBasins(true);
    setShowBasinLayer(true);

  }
  const setChangeDefault = () =>{
    setIsZoomDepartment(false);
    setIsZoomEvent(false);
    setIsZoomProvinces(false);
    setIsZoomBasins(false);
  }

  const onOffLayer = (event) =>{
    setShowLayer1(event.target.checked)
    setChangeDefault()
  }
  const onOffRiverLayer = (event) =>{
    setShowRiverLayer(event.target.checked)
    setChangeDefault()

  }
  const onOffZonesLayer = (event) =>{
    setShowZonesLayer(event.target.checked)
    setChangeDefault()

  }
  const onOffProvincesLayer = (event) =>{
    setShowProvinceLayer(event.target.checked)
    setChangeDefault()

  }
  const onOffBasinsLayer = (event) =>{
    setShowBasinLayer(event.target.checked)
    setChangeDefault()

  }
  const onOffDepartmentLayer = (event) =>{
    setShowDepartmentLayer(event.target.checked)
    setChangeDefault()

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
const getStyleRegion =(feature) =>{
  return FeatureStyles.Department
}
const getStyleProvince =(feature) =>{
  return FeatureStyles.Province
}
const getStyleBasin =(feature) =>{
  return FeatureStyles.Basins
}

  // Adding the dropdownmenu departments
  useEffect(() => {

    const service_link_dates = 'http://127.0.0.1:8000/apps/silvia/departments/';

    const fetchDepartments = async () =>{
      try {
          const {data: response} = await axios.get(service_link_dates);
          console.log(response)
          setDepartments(response['departments'])
          setActualDepartment(response['departments'][0])
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchDepartments();
  
  }, [])

    // Adding the dropdownmenu provinces
    useEffect(() => {

      const service_link_dates = 'http://127.0.0.1:8000/apps/silvia/provincias/';
  
      const fetchProvinces = async () =>{
        try {
            const {data: response} = await axios.get(service_link_dates);
            console.log(response)
            setProvinces(response['provinces'])
            setActualProvince(response['provinces'][0])
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchProvinces();
    
    }, [])
    // Adding the dropdownmenu basins
    useEffect(() => {

      const service_link_dates = 'http://127.0.0.1:8000/apps/silvia/basins/';
  
      const fetchBasins = async () =>{
        try {
            const {data: response} = await axios.get(service_link_dates);
            console.log(response)
            setBasins(response['basin'])
            setActualBasin(response['basin'][0])
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchBasins();
    
    }, [])

  useEffect(() => {
    console.log(actualDepartment)
    const Mydata = {
      'department': actualDepartment
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const service_link = 'http://127.0.0.1:8000/apps/silvia/departments-json/';
    const fetchDepartmentJSON = async () =>{
      try {
        
          const {data: response} = await axios.post(service_link,Mydata,config);
          console.log(response)
          setDepartmentLayer(response)
          setLoading(false);
          // setShowLayer1(true)
        

      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    if(actualDepartment !==''){
      fetchDepartmentJSON();
    }

	}, [actualDepartment]);

  useEffect(() => {
    console.log(actualProvince)
    const Mydata = {
      'provincia': actualProvince
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const service_link = 'http://127.0.0.1:8000/apps/silvia/provincias-json/';
    const fetchProvinciasJSON = async () =>{
      try {
        
          const {data: response} = await axios.post(service_link,Mydata,config);
          console.log(response)
          setProvinciasLayer(response)
          setLoading(false);
          // setShowLayer1(true)
        

      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    if(actualProvince !==''){
      fetchProvinciasJSON();
    }

	}, [actualProvince]);

  useEffect(() => {
    console.log(actualBasin)
    const Mydata = {
      'basin': actualBasin
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const service_link = 'http://127.0.0.1:8000/apps/silvia/basin-json/';
    const fetchBasinJSON = async () =>{
      try {
        
          const {data: response} = await axios.post(service_link,Mydata,config);
          console.log(response)
          setBasinLayer(response)
          setLoading(false);
          // setShowLayer1(true)
        

      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    if(actualBasin !==''){
      fetchBasinJSON();
    }

	}, [actualBasin]);

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
          opacity_vector = {setOpacityVectorLayer}
          vector_op_val = {opacityVectorLayer}
          opacity_rivers = {setOpacityRiverLayer}
          river_op_val = {opacityRiverLayer}
          layer_river =  {showRiverLayer}
          onLayerRiver = {onOffRiverLayer}
          layer_zones = {showZonesLayer}
          onLayerZones = {onOffZonesLayer}
          actual_department = {actualDepartment}
          departments = {departments}
          onDepartmentChange = {changeDepartment}
          actual_province = {actualProvince}
          provinces = {provinces}
          onProvinceChange = {changeProvinces}
          actual_basin = {actualBasin}
          basins = {basins}
          onBasinChange = {changeBasins}
          deactivateZoom = {setChangeDefault}
          onProvinceLayer = {onOffProvincesLayer}
          onBasinLayer = {onOffBasinsLayer}
          onDepartmentLayer = {onOffDepartmentLayer}
          showDepartmentLayer = {showDepartmentLayer}
          showProvinceLayer = {showProvinceLayer}
          showBasinLayer = {showBasinLayer}
        />

        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer 
              layerClass={"base_layer"}
            
              source={osm()} zIndex={0} />
            {showZonesLayer && (
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
            )}
             {showRiverLayer && (
              <TileLayer 
                layerClass={"wms_layer2"}
                source={new TileWMS({
                  url: 'https://senamhi.westus2.cloudapp.azure.com/geoserver/peru_hydroviewer/wms',
                  params: { 'LAYERS': 'south_america-peru-geoglows-drainage_line' },
                  serverType: 'geoserver',
                  crossOrigin: 'Anonymous'
                })} 
                opacity={opacityRiverLayer}
                zIndex={2}
              />
             )}
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
                opacity={opacityVectorLayer}
                zIndex={3}
                isZoom = {isZoomEvent}

              />
            )}
            { showDepartmentLayer && 
                <VectorLayer
                source={vector({
                  features: new GeoJSON().readFeatures(departmentLayer, {
                    featureProjection: get("EPSG:3857"),
                  }),
                })}
                style={function(feature){
                  return getStyleRegion(feature)
                }}
                opacity={1}
                zIndex={4}
                isZoom = {isZoomDepartment}
              />
            }

              {showProvinceLayer && 
                  <VectorLayer
                  source={vector({
                    features: new GeoJSON().readFeatures(provinciasLayer, {
                      featureProjection: get("EPSG:3857"),
                    }),
                  })}
                  style={function(feature){
                    return getStyleProvince(feature)
                  }}
                  opacity={1}
                  zIndex={5}
                  isZoom = {isZoomProvinces}
                />
              }

              {showBasinLayer &&
                  <VectorLayer
                  source={vector({
                    features: new GeoJSON().readFeatures(basinLayer, {
                      featureProjection: get("EPSG:3857"),
                    }),
                  })}
                  style={function(feature){
                    return getStyleBasin(feature)
                  }}
                  opacity={1}
                  zIndex={5}
                  isZoom = {isZoomBasins}
                />
              }


          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>


      </ContainerFlex>
        )}
      <Modal 
        ref={modal}
        defaultOpened ={true}
        >
          <div>
            <h4>
              Terminos de Uso
            </h4>
            <br></br>
          </div>
          <div>
            <p>
            Este producto contiene estimaciones de potenciales movimientos en masa a nivel
            nacional. 
            </p>
            <p>
            El uso del portal se realizará bajo la única y exclusiva responsabilidad del
            usuario.
            </p>
            <p>
            Mayor información en el siguiente <a></a> <a href="https://www.senamhi.gob.pe/?p=monitoreo-silvia">Enlace</a>
            </p>

          </div>

      </Modal>
    </div>
  );
};

export default App;

{/* <TileLayer 
layerClass={"base_layer"}

source={xyz(
  {
    attributions:
    'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
    'rest/services/World_Street_Map/MapServer">ArcGIS</a>',
    url:
    'https://server.arcgisonline.com/ArcGIS/rest/services/' +
    'World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  }
)} zIndex={0} /> */}