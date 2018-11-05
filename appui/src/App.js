import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import AssetList from './components/Asset/AssetList';
import AssetInfo from './components/AssetInfo/AssetInfo';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assets: []
    }

  }



  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to EtherMarket</h1>
        <h2>Created by me</h2>
      </header>
      <p className="App-intro">
        Welcome on EtherMarket
      </p>


      <Router>
        <div>
          <Link to="/">Asset List</Link> |
          <Link to="/asset">Asset</Link>
          <hr/>
          <Route exact="exact" path="/" component={AssetList}/>
          <Route exact="exact" path="/asset" render={() => (<h3>Please select a asset.</h3>)}/>
          <Route path="/asset/:assetinfo" component={AssetInfo}/> {/* This is an example of a URL parameter */}
        </div>
      </Router>

{/*dsdsds*/}
    </div>);
  }
}

export default App;
