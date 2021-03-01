import { ThaiDatePipe } from './../../directives/thaidate.pipe';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
import { MoreDetailComponent } from 'app/dashboard/more-detail/more-detail.component';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ListSubEquipmentComponent } from 'app/request-equipment/list-sub-equipment/list-sub-equipment.component';
import { ManageEquipmentsComponent } from 'app/admin/manage-equipments/manage-equipments.component';
import {MatPaginatorModule} from '@angular/material/paginator';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddUserComponent } from 'app/admin/add-user/add-user.component';
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
    MatProgressSpinnerModule,
    CKEditorModule,
    MatPaginatorModule,
    Ng2SearchPipeModule
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
    ListSubEquipmentComponent,
    ThaiDatePipe,
    ManageEquipmentsComponent,
    MoreDetailComponent,
    AddUserComponent
  ],
  entryComponents: [MoreDetailComponent, UserDetailComponent, DetailHistoryComponent, AddUserComponent]
})

export class AdminLayoutModule {}
