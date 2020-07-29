import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ListPlatesComponent from './component/plate/ListPlatesComponent';
import PlateFormComponent from './component/plate/PlateFormComponent';
import PlateDetailsComponent from './component/plate/PlateDetailsComponent';
import ListAccessesComponent from './component/access/ListAccessesComponent';
import AccessFormComponent from './component/access/AccessFormComponent';


export default function AppRoutes() {
    return (
      <Switch>
        <Route path="/" exact component={ListAccessesComponent} />

        <Route path="/plates" exact component={ListPlatesComponent} />
        <Route path="/plates/:id" component={PlateFormComponent} />
        <Route path="/plates/details/:id" component={PlateDetailsComponent} />
          
        <Route path="/accesses" exact component={ListAccessesComponent} />
        <Route path="/accesses/:id" component={AccessFormComponent} />
      </Switch>
    );
}