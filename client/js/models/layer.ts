import {fromJS} from 'immutable';
import * as MAP_STYLE from './map-style-basic-v8.json';

export const defaultLayer = fromJS((<any>MAP_STYLE).default);

const pointLayer = {
  id: 'point',
  type: 'circle',
  source: 'lgis',
  'source-layer': 'tile',
  interactive: true,
  paint: {
    'circle-color': '#4153f4',
  },
};

const lineStringLayer = {
  id: 'linestring',
  type: 'line',
  source: 'lgis',
  'source-layer': 'tile',
  interactive: true,
  paint: {
    'line-color': '#176b31',
  },
};

const polygonLayer = {
  id: 'polygon',
  type: 'fill',
  source: 'lgis',
  'source-layer': 'tile',
  interactive: true,
  paint: {
    'fill-color': '#96a186',
    'fill-opacity': 0.8,
    'fill-outline-color': 'black',
  },
};

const getSource = (host: string, db: string, table: string) => ({
  type: 'vector',
  tiles: [`http://localhost:3000/tiles/${host}/${db}/${table}/{z}/{x}/{y}`],
});

const getLayer = (geomType: string) => {
  switch (geomType) {
    case 'point':
      return fromJS(pointLayer);
    case 'linestring':
      return fromJS(lineStringLayer);
    case 'polygon':
      return fromJS(polygonLayer);
    default:
      throw new Error('Geometry type is not choosen.');
  }
};

const setSource = (prevMapStyle: any, source: any) => {
  const hasSource = prevMapStyle.hasIn(['sources', 'lgis'], source);
  if (!hasSource) {
    return prevMapStyle.setIn(['sources', 'lgis'], source);
  }
  return prevMapStyle;
};

export const addLayerStyle = (
  prevMapStyle: any,
  settingJson: string,
  table: string,
  geomType: string,
) => {
  const settings = JSON.parse(settingJson);
  const source = getSource(settings.host, settings.db, table);
  const layer = getLayer(geomType);

  const mapStyle = setSource(prevMapStyle, fromJS(source));
  return mapStyle.set('layers', mapStyle.get('layers').push(layer));
};
