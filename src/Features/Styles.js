import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

const LAYERstyles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: "magenta",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  OneLevel:new Style({
    stroke: new Stroke({
      color: "#101010",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0)",
    }),
  }),
  SecondLevel:new Style({
    stroke: new Stroke({
      color: "#101010",
      width: 2,
    }),
    fill: new Fill({
      color: "yellow",
    }),
  }),
  ThirdLevel:new Style({
    stroke: new Stroke({
      color: "#101010",
      width: 2,
    }),
    fill: new Fill({
      color: "orange",
    }),
  }),
  FourthLevel:new Style({
    stroke: new Stroke({
      color: "#101010",
      width: 2,
    }),
    fill: new Fill({
      color: "red",
    }),
  }),
  Department:new Style({
    stroke: new Stroke({
      color: "#16a085",
      width: 4,
    }),
    fill: new Fill({
      color: "transparent",
    }),
  }),
  Province:new Style({
    stroke: new Stroke({
      color: "#364652",
      width: 4,
    }),
    fill: new Fill({
      color: "transparent",
    }),
  }),
  Basins:new Style({
    stroke: new Stroke({
      color: "#FF729F",
      width: 4,
    }),
    fill: new Fill({
      color: "transparent",
    }),
  })
};

export default LAYERstyles;