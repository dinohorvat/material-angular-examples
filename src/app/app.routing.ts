import { Routes } from '@angular/router';
import {RegulatedRequestComponent} from "./components/regulated-request/regulated-request.component";
import {IndividualRequestComponent} from "./components/individual-request/individual-request.component";

export const rootRouterConfig: Routes = [
  {
    path: 'regulated',
    component: RegulatedRequestComponent,
  },
  {
    path: 'individual',
    component: IndividualRequestComponent,
  },
];

