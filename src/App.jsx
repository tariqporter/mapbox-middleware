import React, { PureComponent } from 'react';
import Header from './components/Header';
import MapBox from './components/MapBox';
import SideBar from './components/SideBar';

class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <Header />
        <div style={{ display: 'flex' }}>
          <MapBox />
          <SideBar />
        </div>
      </div>
    );
  }
}

export default App;