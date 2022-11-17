import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import VectorLayer from "ol/layer/Vector";

const VectorLayerWrapper = ({ source, style, opacity, zIndex = 0, isZoom, setIsZoom }) => {
	const { map } = useContext(MapContext);
	// const [vectorLayerSource, setVectorLayerSource] = useState();


	useEffect(() => {
		console.log("useEffect vectorLayer");
		
		if (!map) return;

		let vectorLayerMap

		vectorLayerMap = new VectorLayer({
			source,
			style,
			opacity
		});

		map.addLayer(vectorLayerMap);
		vectorLayerMap.setZIndex(zIndex);

		const zoom_to_layer = async () =>{
			try {
				// map.getView().animate({
				// 	zoom: map.getView().getZoom(),
				// 	duration: 1000
				// });
				
				map.getView().fit(source.getExtent(), {duration: 900});
				
			} catch (error) {
			//   console.error(error.message);
			}
		  }
		if(isZoom){
			zoom_to_layer();
		}



		return () => {
			if (map) {
				console.log("here removing vector layer")
				map.removeLayer(vectorLayerMap);
				try{
					setIsZoom(false)
				}
				catch (error) {
					//   console.error(error.message);
				}
			}
		};
	}, [map,source]);

	// useEffect(() => {
	// 	if (!map) return;


	//   return () => {
		
	//   }
	// }, [source])
	

	
	return null;
};

export default VectorLayerWrapper;