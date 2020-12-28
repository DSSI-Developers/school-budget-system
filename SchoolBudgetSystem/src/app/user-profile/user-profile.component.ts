import { ManageProfileComponent } from 'app/user-profile/manage-profile/manage-profile.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  position: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  userData: UserData[] = [
    {firstName: 'กฤษณะ', lastName: 'ประสิทธิ์', email: 'kritsana.pr.60@ubu.ac.th', phone: '09876543221', gender: 'ชาย', age: '22', position: 'ผู้ดูแลระบบ'},
  ]
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  editUser() {
    const dialogRef = this.dialog.open(ManageProfileComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
