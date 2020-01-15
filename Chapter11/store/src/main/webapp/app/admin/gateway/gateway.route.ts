import { Route } from '@angular/router';

import { JhiGatewayComponent } from './gateway.component';

export const gatewayRoute: Route = {
  path: '',
  component: JhiGatewayComponent,
  data: {
    pageTitle: 'gateway.title'
  }
};
