import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { SetBudgetService } from "../../services/set-budget.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import { DetailManageBudgetComponent } from 'app/leader/detail-manage-budget/detail-manage-budget.component';
import THBText from 'thai-baht-text'
import Swal from 'sweetalert2/dist/sweetalert2.js';
interface Department {
  viewValue: string;
  value: string;
}
@Component({
  selector: "app-manage-budget",
  templateUrl: "./manage-budget.component.html",
  styleUrls: ["./manage-budget.component.css"],
})
export class ManageBudgetComponent implements OnInit {
  departments: Department[] = [
    {
      value: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
      viewValue: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
      viewValue: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
      viewValue: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
    },
    { value: "กลุ่มสาระการเรียนรู้", viewValue: "กลุ่มสาระการเรียนรู้ภาษาไทย" },
    {
      value: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
      viewValue: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
    },
    {
      value: "กลุ่มสาระการเรียนรู้",
      viewValue: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ศิลปะ",
      viewValue: "กลุ่มสาระการเรียนรู้ศิลปะ",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
      viewValue: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
    },
  ];
  thaiBaht: string;
  mode: string = 'create';
  dataBudget = new FormGroup({
    budget: new FormControl(""),
    date: new FormControl(""),
    learningGroup: new FormControl("")
  });
  budgetDetail: import("/Users/kritsanaprasit/Desktop/ProjectCS/school-budget-system/SchoolBudgetSystem/src/models/setBudget.model").SetBudget[];

  constructor(
    public usersServices: UsersService,
    public setBudgetService: SetBudgetService,
    public dialogRef: MatDialogRef<ManageBudgetComponent>,
    public dialogDetail: MatDialogRef<DetailManageBudgetComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      budget: number;
      date: Date;
      learningGroup: string;
    },
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    // console.log(this.data.id);
    // console.log(this.data.budget);
    // console.log(this.data.learningGroup);
    // console.log(this.data.date);
    const id = this.usersServices.getUserId();
    this.usersServices.getUserDetail(id).subscribe((data) => {
      console.log(data.data['department']);
      if (this.data) {
        this.mode = 'edit';
        this.dataBudget.patchValue({
          budget: this.data.budget,
          date: this.data.date,
          learningGroup: this.data.learningGroup,
        });
      } else {
        this.mode = 'create';
        this.dataBudget.patchValue({
          learningGroup: data.data['department']
        });
      }
    });
  }

  setBudget() {
    if (this.mode === 'create') {
      this.setBudgetService.updateListener().subscribe(result => {
        // tslint:disable-next-line: forin
        for (let i = 0; i < result.length; i++) {
          console.log(result[i]['learningGroup']);
        }
      });
      this.setBudgetService.setBudget(
        this.dataBudget.value.budget,
        this.dataBudget.value.date,
        this.dataBudget.value.learningGroup
      );
    } else {
      this.setBudgetService.editDataBudget(
        this.data.id,
        this.dataBudget.value.budget,
        this.dataBudget.value.date,
        this.dataBudget.value.learningGroup
      );
    }
    this.dialogRef.close();
    this.setBudgetService.getAllDataBudget();
  }

  closeDialog() {
    this.dialogRef.close();
    const dialogSetBudget = this.dialog.open(DetailManageBudgetComponent, {
      width: '60%',
    });
    this.setBudgetService.getAllDataBudget();
  }
}
