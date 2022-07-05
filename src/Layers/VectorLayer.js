import { useContext, useEffect, useState } from "react";
import MapContext from "../Map/MapContext";
import VectorLayer from "ol/layer/Vector";
import { Vector as VectorSource } from 'ol/source';

const VectorLayerWrapper = ({ source, style, zIndex = 0 }) => {
	const { map } = useContext(MapContext);
	const [vectorLayerSource, setVectorLayerSource] = useState()


	useEffect(() => {
		console.log("useEffect vectorLayer");
		
		if (!map) return;

		let vectorLayerMap

		vectorLayerMap = new VectorLayer({
			source,
			style
		});

		map.addLayer(vectorLayerMap);
		vectorLayerMap.setZIndex(zIndex);
		console.log("adding extent",source.getExtent())

		console.log("fitting",typeof(source))

		if(!source){
			setVectorLayerSource(source)
		}
		return () => {
			if (map) {
				console.log("here removing vector layer")

				map.removeLayer(vectorLayerMap);

			}


		};
	}, [map]);
	useEffect(() => {
		console.log("calling it")
		if (!map) return;
		map.getView().fit(source.getExtent());
		setVectorLayerSource(source)

	  return () => {
		
	  }
	}, [vectorLayerSource])
	
	
	
	return null;
};

export default VectorLayerWrapper;