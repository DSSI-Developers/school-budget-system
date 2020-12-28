import { UserDetailComponent } from './../user-detail/user-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  @Output() passingData = new EventEmitter<object>();

  allUser = [
    {id: 1, firstName: 'Kritsana', lastName: 'Prasit', email: 'admin@gmail.com', password: 'admin', phone: '0987654321', position: 'admin', role: 'admin', permission: 'Authorization'},
    {id: 2, firstName: 'Prasit', lastName: 'Kritsana', email: 'kritsana.pr.60@ubu.ac.th', password: '1234567890', phone: '0987654321', position: 'user', role: 'user', permission: 'Anonymous'},
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  userDetail(id) { 
    this.passingData.emit(id);
    const dialogRef = this.dialog.open(UserDetailComponent);

    // dialogRef.afterClosed().subscribe(id => {
    //   console.log(`Dialog result: ${id}`);
    // });

    console.log(`Data id : ${id}`);
    
  }
}
