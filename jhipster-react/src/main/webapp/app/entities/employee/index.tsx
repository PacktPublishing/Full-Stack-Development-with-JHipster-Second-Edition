import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Employee from './employee';
import EmployeeDetail from './employee-detail';
import EmployeeUpdate from './employee-update';
import EmployeeDeleteDialog from './employee-delete-dialog';

const Routes = ({ match }) => (
  <>
<Switch>
  <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeDeleteDialog} />
  <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeUpdate} />
  <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeUpdate} />
  <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeDetail} />
  <ErrorBoundaryRoute path={match.url} component={Employee} />
</Switch>
  </>
);

export default Routes;
