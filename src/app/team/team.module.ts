import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import { CreateTeamFormComponent } from './components/create-team-form/create-team-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    TeamComponent,
    CreateTeamFormComponent
  ],
    imports: [
        CommonModule,
        TeamRoutingModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
    ]
})
export class TeamModule { }
