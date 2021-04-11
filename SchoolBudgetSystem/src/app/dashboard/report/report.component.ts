import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SetBudgetService } from 'app/services/set-budget.service';
import { UsersService } from 'app/services/users.service';
import { EquipmentsService } from '../../services/equipments.service';
import { Equipments } from '/Users/kritsanaprasit/Desktop/ProjectCS/school-budget-system/SchoolBudgetSystem/src/models/equipments.model';
import { SubEquipmentsService } from '../../services/sub-equipments.service';
import { ReportDetailComponent } from '../report-detail/report-detail.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  learningGroup: any;
  equipment: any;
  groupEquipment: any;
  totalAmount: number;
  totalBudget: number = 0;

  constructor(
    public usersServices: UsersService,
    public setBudgetService: SetBudgetService,
    private equipmentServices: EquipmentsService,
    public dialog: MatDialog,
    public subServices: SubEquipmentsService
    // @Inject(MAT_DIALOG_DATA)
    // public data: {
    // document: object
    // },
  ) { }

  ngOnInit(): void {
    const userID = this.usersServices.getUserId();
    this.usersServices.getUserDetail(userID).subscribe(user => {
      this.learningGroup = user.data['department'];
      console.log(this.learningGroup);

      this.equipmentServices.getAllEquipments();
      this.equipmentServices.getEquipmentUpdateListener().subscribe(equipment => {
        this.equipment = equipment;
        this.groupEquipment = this.equipment.filter(group => group.learningGroups === this.learningGroup && group.status !== 'กำลังดำเนินการ');
        console.log(this.groupEquipment);
        for (let i = 0; i < this.groupEquipment.length; i++) {
          this.totalBudget +=  this.groupEquipment[i]['budget'];
        }
      });
    });
  }

  detailEquipment(id: string) {
    // console.log(id);
    const detailReportDialog = this.dialog.open(ReportDetailComponent, {
      width: '70%',
      data: {
        id: id
      }
    });
  }
}
