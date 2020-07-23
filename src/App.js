import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPlatesComponent from './component/plate/ListPlatesComponent';
import PlateFormComponent from './component/plate/PlateFormComponent';
import PlateDetailsComponent from './component/plate/PlateDetailsComponent';
import ListAccessesComponent from './component/access/ListAccessesComponent';
import AccessComponent from './component/access/AccessComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ListAccessesComponent} />

          <Route path="/plates" exact component={ListPlatesComponent} />
          <Route path="/plates/:id" exact component={PlateFormComponent} />
          <Route path="/plates/details/:id" exact component={PlateDetailsComponent} />
          
          <Route path="/accesses" exact component={ListAccessesComponent} />
          <Route path="/accesses/:id" component={AccessComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;