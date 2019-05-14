import { MAPBOX_ACTIONS, MapBoxAction, ACTIONS } from "./map";

const id = 'main-map';

export const setupMapAction = (map) => ({
  type: new MapBoxAction(MAPBOX_ACTIONS.MAPGL_SETUP_MAP),
  id,
  map
});

export const setPointsAction = (points) => ({
  type: new MapBoxAction(MAPBOX_ACTIONS.MAPGL_ADD_POINTS),
  id,
  points
});

export const selectPointAction = (point) => dispatch => {
  dispatch({ type: new MapBoxAction(MAPBOX_ACTIONS.MAPGL_SELECT_POINT), id, point }); // We want to tell the map that something happened
  dispatch({ type: ACTIONS.MAPGL_POINT_SELECTED, point }); // We want to tell the rest of the application something happened
};