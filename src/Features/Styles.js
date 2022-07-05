import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export default {
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
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  SecondLevel:new Style({
    stroke: new Stroke({
      color: "yellow",
      width: 2,
    }),
    fill: new Fill({
      color: "rgba(81, 80, 79, 1)",
    }),
  }),
  ThirdLevel:new Style({
    stroke: new Stroke({
      color: "orange",
      width: 2,
    }),
    fill: new Fill({
      color: "rgba(81, 80, 79, 1)",
    }),
  }),
  FourthLevel:new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
    }),
    fill: new Fill({
      color: "rgba(81, 80, 79, 1)",
    }),
  }),
  
};

// rgba(0, 0, 255, 0.1)