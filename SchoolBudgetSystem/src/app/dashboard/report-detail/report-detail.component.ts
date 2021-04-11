import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetBudgetService } from 'app/services/set-budget.service';
import { UsersService } from 'app/services/users.service';
import { ReportComponent } from 'app/dashboard/report/report.component';
import { SubEquipmentsService } from '../../services/sub-equipments.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  subEquipment: any;
  budget: number = 0;

  constructor(
    public usersServices: UsersService,
    public setBudgetService: SetBudgetService,
    public subEquipmentsService: SubEquipmentsService,
    public dialogReportDetail: MatDialogRef<ReportDetailComponent>,
    public reportDialog: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
    },
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const mainId = this.data.id;
    this.subEquipmentsService.getEquipmentBySubId(mainId);
    this.subEquipmentsService.subEquipmentListenUpdate().subscribe(data => {
      this.subEquipment = data;
      console.log(this.subEquipment);
      
      for (let i = 0; i < this.subEquipment.length; i++) {
        this.budget += this.subEquipment[i]['budget'];
      }
      console.log(this.budget);
      
    });
  }


  closeDialog() {
    this.dialogReportDetail.close();
    const dialogReport = this.dialog.open(ReportComponent, {
      width: '70%',
    });
  }

}
