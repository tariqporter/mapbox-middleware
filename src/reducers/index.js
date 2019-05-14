import { ACTIONS } from "../actions/map";

const initialState = {
  zoom: 10.8,
  center: [-73.9924478125191, 40.74830012076461],
  points: [
    { id: 0, text: 'Statue of Liberty', description: 'Built in 1875', latLng: [-74.0445004, 40.6892494] },
    { id: 1, text: 'Empire State Building', description: 'Built in 1930', latLng: [-73.9878531, 40.7484405] }
  ],
  selectedPointId: 0
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTIONS.MAPGL_POINT_SELECTED: {
      return { ...state, selectedPointId: action.point.id };
    }
    default:
      return state;
  }
}