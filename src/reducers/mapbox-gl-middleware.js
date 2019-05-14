import { MapBoxAction, MAPBOX_ACTIONS } from '../actions/map'

const maps = {};

export default ({ dispatch, getState }) => next => action => {
  if (action.type.constructor === MapBoxAction) {
    const state = getState();
    const id = action.id;
    if (typeof id === 'undefined') {
      throw new Error('id of map must be defined for mapbox-gl-middleware');
    }
    switch (action.type.type) {
      case MAPBOX_ACTIONS.MAPGL_SETUP_MAP: {
        maps[id] = action.map;
        maps[id].addDispatch(dispatch);
        return state;
      }
      case MAPBOX_ACTIONS.MAPGL_ADD_POINTS: {
        maps[id].setPoints(action.points);
        return state;
      }
      case MAPBOX_ACTIONS.MAPGL_SELECT_POINT: {
        maps[id].selectPoint(action.point);
        return state;
      }
      default: {
        return state;
      }
    }
  }
  return next(action);
};
