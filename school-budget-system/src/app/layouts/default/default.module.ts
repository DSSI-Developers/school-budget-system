import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from 'src/app/layouts/default/default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectAllComponent } from 'src/app/modules/project-all/project-all.component';

import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DefaultComponent,
    ProjectAllComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ]
})
export class DefaultModule { }
