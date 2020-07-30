import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PlateFormComponent from './component/plate/PlateFormComponent';
import PlateDetailsComponent from './component/plate/PlateDetailsComponent';
import AccessFormComponent from './component/access/AccessFormComponent';

import PlateList from './component/plate/PlateList';
import AccessList from './component/access/AccessList';
import PlateForm from './component/plate/PlateForm';


export default function AppRoutes() {
    return (
      <Switch>
        <Route path="/" exact component={AccessList} />

        <Route path="/test/:id" component={PlateForm} />

        <Route path="/plates" exact component={PlateList} />
        <Route path="/plates/:id" exact component={PlateFormComponent} />
        <Route path="/plates/details/:id" exact component={PlateDetailsComponent} />
          
        <Route path="/accesses" exact component={AccessList} />
        <Route path="/accesses/:id" exact component={AccessFormComponent} />
      </Switch>
    );
}