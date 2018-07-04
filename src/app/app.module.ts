import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatRadioModule, MatSelectModule, MatStepperModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegulatedRequestComponent} from "./components/regulated-request/regulated-request.component";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routing";
import {IndividualRequestComponent} from "./components/individual-request/individual-request.component";
import {InstitutionRequestComponent} from "./components/institution-request/institution-request.component";

@NgModule({
  declarations: [
    AppComponent,
    RegulatedRequestComponent,
    IndividualRequestComponent,
    InstitutionRequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatOptionModule,
    MatButtonToggleModule,
    MatSelectModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
