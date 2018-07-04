import { Routes } from '@angular/router';
import {RegulatedRequestComponent} from "./components/regulated-request/regulated-request.component";
import {IndividualRequestComponent} from "./components/individual-request/individual-request.component";
import {InstitutionRequestComponent} from "./components/institution-request/institution-request.component";

export const rootRouterConfig: Routes = [
  {
    path: 'regulated',
    component: RegulatedRequestComponent,
  },
  {
    path: 'individual',
    component: IndividualRequestComponent,
  },
  {
    path: 'institution',
    component: InstitutionRequestComponent
  }
];

