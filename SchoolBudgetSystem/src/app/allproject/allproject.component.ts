import { DetailHistoryComponent } from './detail-history/detail-history.component';
import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { UsersService } from 'app/services/users.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.css']
})
export class AllprojectComponent implements OnInit {

  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public dialog: MatDialog,  private userServices: UsersService) { }

  ngOnInit(): void {
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DetailHistoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

