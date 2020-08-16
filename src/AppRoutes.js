import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlateListComponent from './component/plate/PlateListComponent';
import PlateFormComponent from './component/plate/PlateFormComponent';
import PlateDetailsComponent from './component/plate/PlateDetailsComponent';
import AccessListComponent from './component/access/AccessListComponent';
import AccessFormComponent from './component/access/AccessFormComponent';
import Page404 from './component/errors/Page404';


export default function AppRoutes() {
    return (
      <Switch>
        <Route path="/" exact component={AccessListComponent} />

        <Route path="/plates" exact component={PlateListComponent} />
        <Route path="/plates/:id" exact component={PlateFormComponent} />
        <Route path="/plates/details/:id" component={PlateDetailsComponent} />
          
        <Route path="/accesses" exact component={AccessListComponent} />
        <Route path="/accesses/:id" component={AccessFormComponent} />

        <Route path="" component={Page404} />
      </Switch>
    );
}