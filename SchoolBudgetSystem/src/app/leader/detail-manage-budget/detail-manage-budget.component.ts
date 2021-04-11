import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageBudgetComponent } from 'app/leader/manage-budget/manage-budget.component';
import { UsersService } from '../../services/users.service';
import { SetBudgetService } from '../../services/set-budget.service';
import { SetBudget } from '../../../models/setBudget.model';
import THBText from 'thai-baht-text'

@Component({
  selector: 'app-detail-manage-budget',
  templateUrl: './detail-manage-budget.component.html',
  styleUrls: ['./detail-manage-budget.component.css'],
})
export class DetailManageBudgetComponent implements OnInit {

  budget: number;
  learningGroup: string;
  date: Date;
  creator: string;
  allData: any;
  dataDetail: any;
  role: any;
  thaiBaht: string;

  constructor(
    public dialog: MatDialog,
    public usersServices: UsersService,
    public setBudgetServices: SetBudgetService
  ) {

  }

  ngOnInit(): void {
    const userId = this.usersServices.getUserId();
    this.usersServices.getUserDetail(userId).subscribe(userData => {
      const userDetail = userData.data['department']
      this.role = userData.data['role'];
      this.setBudgetServices.getDataBudget().subscribe((detail) => {
        this.allData = detail.data;
        this.dataDetail = this.allData.filter(data => data.learningGroup === userDetail);
        console.log(this.dataDetail);
        console.log(this.allData);
        if (!this.allData) {
          this.thaiBaht = THBText(0);
        } else {
          const budget = this.dataDetail[0]['budget'];
          this.thaiBaht = THBText(budget);
        }
      });
    });
  }
  addBudget() {
    const dialogSetBudget = this.dialog.open(ManageBudgetComponent, {
      width: '60%'
    });
  }

  makeBudget(dataDetail?: string) {
    console.log(dataDetail[0]['_id']);
    const dialogSetBudget = this.dialog.open(ManageBudgetComponent, {
      width: '60%',
      restoreFocus: false,
      data: {
        id: dataDetail[0]['_id'],
        budget: dataDetail[0]['budget'],
        learningGroup: dataDetail[0]['learningGroup'],
        date: dataDetail[0]['date']
      }
    });
  }

  clearBudget(dataDetail: string) {
    const setId = dataDetail[0]['_id'];
    // console.log(setId);
    this.setBudgetServices.deleteBudget(setId);
  }
}
