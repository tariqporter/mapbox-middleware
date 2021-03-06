import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMap } from '../actions/map';
import { withStyles } from '@material-ui/core';
import { setupMapAction, setPointsAction } from '../actions';

export const styles = {
  root: {
    width: '100%',
    height: '100%'
  },
  map: {
    width: '500px',
    height: '500px',
    '& .mapboxgl-popup-content': {
      pointerEvents: 'none',
      padding: '5px 16px',
      borderRadius: '7px',
      fontWeight: 500
    }
  },
};

class MapBox extends PureComponent {

  componentDidMount() {
    const { zoom, center, points, setupMap, setPoints } = this.props;
    createMap({ zoom, center }).then(map => {
      setupMap(map);
      setPoints(points);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <div id="map" className={classes.map}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ center, zoom, points }) => ({
  center, zoom, points
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    setupMap: setupMapAction,
    setPoints: setPointsAction
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapBox));