import MapGL from 'mapbox-gl';

// Actions to cause change inside map
export const MAPBOX_ACTIONS = {
  MAPGL_SETUP_MAP: 'MAPGL_SETUP_MAP',
  MAPGL_ADD_POINTS: 'MAPGL_ADD_POINTS',
  MAPGL_SELECT_POINT: 'MAPGL_SELECT_POINT'
};

// Actions to cause outside behaviour from interaction with map
export const ACTIONS = {
  MAPGL_POINT_SELECTED: 'MAPGL_POINT_SELECTED',
  MAPGL_ZOOMED: 'MAPGL_ZOOMED'
};

export class MapBoxAction {
  constructor(type) {
    this.type = type;
  }
}

export class Map {
  constructor(map, dispatch) {
    this.map = map;
    this.dispatch = dispatch;
    this.points = [];
    this.clickFn = null;
    this.zoomFn = null;
  }

  addDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  setPoints(points) {
    if (this.clickFn) {
      this.map.off('click', this.clickFn);
    }
    this.clickFn = (e) => {
      this.clearPopups();
    };

    if (this.zoomFn) {
      this.map.off('zoom', this.zoomFn);
    }
    this.zoomFn = (e) => {
      const zoom = this.map.getZoom();
      this.dispatch({ type: ACTIONS.MAPGL_ZOOMED, zoom });
    };

    this.map.on('click', this.clickFn);
    this.map.on('zoom', this.zoomFn);

    points.forEach((point) => {
      const el = document.createElement('div');
      el.innerHTML = `<div class="marker"><div class="marker_content">${point.text}</div></div>`;
      el.addEventListener('click', () => {
        this.onPointClick(point);
      });

      const popup = new MapGL.Popup({ closeOnClick: false, closeButton: false, offset: 25 })
        .setHTML(point.description);

      const marker = new MapGL.Marker(el)
        .setLngLat({ lng: point.latLng[0], lat: point.latLng[1] })
        .setPopup(popup)
        .addTo(this.map);

      this.points.push({ point, popup, marker });
    });
  }

  clearPopups() {
    this.points.forEach((point) => {
      point.popup.remove();
    });
  }

  selectPoint(point) {
    const pointObj = this.points.find(x => x.point.id === point.id);
    this.clearPopups();
    pointObj.popup.addTo(this.map);
  }

  onPointClick(point) {
    this.dispatch({ type: ACTIONS.MAPGL_POINT_SELECTED, point });
  }
}

export const createMap = (options) => {
  let mapOptions = {
    bearing: 0,
    bounds: [
      [0, 0],
      [0, 0]
    ],
    center: [0, 0],
    container: 'map',
    pitch: 0,
    style: process.env.REACT_APP_MAPGL_STYLE_URL,
    zoom: 12
  };
  mapOptions = { ...mapOptions, ...options };
  MapGL.accessToken = process.env.REACT_APP_MAPGL_ACCESS_TOKEN;
  const map = new MapGL.Map(mapOptions);
  return new Promise((resolve, reject) => {
    map.on('load', () => resolve(new Map(map)));
  });
};