import { Subscription } from 'rxjs/Subscription';
import { UserDetailComponent } from './../user-detail/user-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input,Output, EventEmitter, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
//  Import service user to use API
import { UsersService } from './../../services/users.service';
import { Users } from './../../../models/users.model';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit, OnDestroy {
  @Output() passingData = new EventEmitter<object>();

  // allUser = [
  //   {id: 1, firstName: 'Kritsana', lastName: 'Prasit', email: 'admin@gmail.com', password: 'admin', phone: '0987654321', position: 'admin', role: 'admin', permission: 'Authorization'},
  //   {id: 2, firstName: 'Prasit', lastName: 'Kritsana', email: 'kritsana.pr.60@ubu.ac.th', password: '1234567890', phone: '0987654321', position: 'user', role: 'user', permission: 'Anonymous'},
  // ];
  users$;
  userData$;
  personalData;

  constructor(public dialog: MatDialog, private usersServices:UsersService) { }
  ngOnInit(): void {
    this.usersServices.getAllUsers().subscribe((data) => {
      this.users$ = data.users;
      console.log(data);
    });
  }


  userDetail(id) {
    // this.passingData.emit(id);
    // console.log(this.users$);
    this.personalData = this.users$.filter(data => data._id === id);
    console.log(`Personal data : ${this.personalData}`);

    const dialogRef = this.dialog.open(UserDetailComponent,{
      height: '80%',
      width: '90%',
      data: {
        user: this.personalData
      },
    });
    // dialogRef.afterClosed().subscribe(id => {
    //   console.log(`Dialog result: ${id}`);
    // });
    console.log(`Data id : ${id}`);
  }

  ngOnDestroy(): void {
    // this.users$.unsubscripe();
  }
}
