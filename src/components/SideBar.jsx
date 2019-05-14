import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPointAction } from '../actions';
import { Button, withStyles } from '@material-ui/core';

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  }
};

class SideBar extends PureComponent {
  render() {
    const { classes, points, zoom, selectPoint, selectedPointId } = this.props;
    return (
      <div>
        <h3>Zoom level: {zoom.toFixed(2)}</h3>
        {
          points.map(point => (
            <Button key={point.id} classes={{ root: classes.flex }} variant="contained" color={point.id === selectedPointId ? 'primary' : 'default'} onClick={() => selectPoint(point)}>
              <div>{point.text}</div>
            </Button>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = ({ points, zoom, selectedPointId }) => ({
  points, zoom, selectedPointId
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    selectPoint: selectPointAction
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideBar));