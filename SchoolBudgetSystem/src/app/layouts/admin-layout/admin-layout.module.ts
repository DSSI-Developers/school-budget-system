import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { AllprojectComponent } from 'app/allproject/allproject.component';
import { RequestEquipmentComponent } from 'app/request-equipment/request-equipment.component';
import { DetailHistoryComponent } from 'app/allproject/detail-history/detail-history.component';
import { AddRequestEquipmentComponent } from 'app/request-equipment/add-request-equipment/add-request-equipment.component';
import { ManageProfileComponent } from 'app/user-profile/manage-profile/manage-profile.component';
import { ManageSubEquipmentComponent } from 'app/request-equipment/manage-sub-equipment/manage-sub-equipment.component';
import { ManageUserComponent } from 'app/admin/manage-user/manage-user.component';
import { CheckFormComponent } from 'app/leader/check-form/check-form.component';
import { ReadDetailFormComponent } from 'app/leader/read-detail-form/read-detail-form.component';
import { UserDetailComponent } from 'app/admin/user-detail/user-detail.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MaterialModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    AllprojectComponent,
    AllprojectComponent,
    NotificationsComponent,
    RequestEquipmentComponent,
    DetailHistoryComponent,
    AddRequestEquipmentComponent,
    ManageProfileComponent,
    ManageSubEquipmentComponent,
    ManageUserComponent,
    CheckFormComponent,
    ReadDetailFormComponent,
    UserDetailComponent,

  ]
})

export class AdminLayoutModule {}
