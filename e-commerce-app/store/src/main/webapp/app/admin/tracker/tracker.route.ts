import { Route } from '@angular/router';

import { JhiTrackerComponent } from './tracker.component';

export const trackerRoute: Route = {
  path: '',
  component: JhiTrackerComponent,
  data: {
    pageTitle: 'tracker.title'
  }
};
