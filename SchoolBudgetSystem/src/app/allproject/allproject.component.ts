import { DetailHistoryComponent } from './detail-history/detail-history.component';
import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.css']
})
export class AllprojectComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DetailHistoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

