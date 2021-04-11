import { Subscription } from "rxjs/Subscription";

import { Equipments } from "./../../models/equipments.model";
import { EquipmentsService } from "./../services/equipments.service";
import { MoreDetailComponent } from "./more-detail/more-detail.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

// Export PDF
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { UsersService } from "app/services/users.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Chart
import { ChartType, ChartOptions, ChartDataSets } from "chart.js";
import {
  MultiDataSet,
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from "ng2-charts";
import { ExportsEquipmentService } from "app/services/exports-equipment.service";
import { ManageBudgetComponent } from "../leader/manage-budget/manage-budget.component";
import { DetailManageBudgetComponent } from "../leader/detail-manage-budget/detail-manage-budget.component";
import { SetBudgetService } from "../services/set-budget.service";

import { single } from "./data";
import { ReportComponent } from './report/report.component';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  typeChart: any;
  typeChart2: any;
  dataChart: any;
  optionsChart: any;

  equipments: Equipments[] = [];
  successEquipments: Equipments[] = [];
  pendingEquipments: Equipments[] = [];
  failedEquipments: Equipments[] = [];

  isLoading = false;
  private authStatusSub: Subscription;
  private getEquipmentsData: Subscription;
  countSuccess: number;
  countPending: number;
  countFailed: number;
  userId: string;
  statusDetail;
  document: any;

  searchEquipment: string;

  objectData: any;
  all_budget: void;
  all_budget_total: any;
  sci_all_budget_total: any;
  mat_all_budget_total: any;
  work_all_budget_total: any;
  eng_all_budget_total: any;
  art_all_budget_total: any;
  social_all_budget_total: any;
  health_all_budget_total: any;
  thai_all_budget_total: any;

  /**
   * กลุ่มสาระการเรียนรู้
   * วิทย์
   * คณิต
   * การงานอาชีต
   * ภาษาไทย
   * สุขศึกษา
   * สังคมศึกษา
   * ศิลปะ
   * ภาษาต่างประเทศ
   *
   * @type {*}
   * @memberof DashboardComponent
   */
  sci: any;
  mat: any;
  work: any;
  thai: any;
  health: any;
  social: any;
  art: any;
  eng: any;
  budget: any;
  learningGroup: any;
  userDepartment: any;
  budgetDetail: any;

  // Chart
  single: any[];
  multi: any[];

  view: any[] = [1000, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "กลุ่มสาระการเรียนรู้";
  showYAxisLabel = true;
  yAxisLabel = "จำนวนงบประมาณ";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA", "#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };

  dataForChart: Object[] = [];
  role: any;
  constructor(
    public dialog: MatDialog,
    private equipmentServices: EquipmentsService,
    private userServices: UsersService,
    private exportsPDF: ExportsEquipmentService,
    private setBudgetServices: SetBudgetService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  onSelect(event) {
    console.log(event);
  }

  onResize(event) { this.view = [event.target.innerWidth - 900, 280 ]; }

  ngOnInit() {
    // Vertical Bar Charts
    // Object.assign(this, { single });
    const chart = this.dataForChart;
    Object.assign(this, { chart });

    const id = this.userServices.getUserId();
    this.userServices.getUserDetail(id).subscribe((detail) => {
      this.userDepartment = detail.data["department"];
      this.role = detail.data["role"];

      console.log(this.userDepartment);

      this.setBudgetServices.getAllDataBudget();
      this.setBudgetServices.updateListener().subscribe((result) => {
        this.budgetDetail = result.filter(
          (budgetData) => budgetData.learningGroup === this.userDepartment
        );
        console.log(result);
        console.log(this.budgetDetail);
      });
      // this.setBudgetServices.getDataBudget().subscribe(data => {
      //   this.budgetDetail = data.data.filter(budgetData => budgetData.learningGroup === this.userDepartment);
      //   console.log(this.budgetDetail);
      // });
    });
    console.log(id);
    this.equipmentServices
      .getEquipmentUpdateListener()
      .subscribe((objectData: Equipments[]) => {
        this.objectData = objectData;
        this.sci = this.objectData.filter(
          (data) => data.learningGroup == "กลุ่มสาระการเรียนรู้วิทยาศาสตร์"
        );
        this.mat = this.objectData.filter(
          (data) => data.learningGroup == "กลุ่มสาระการเรียนรู้คณิตศาสตร์"
        );
        this.work = this.objectData.filter(
          (data) =>
            data.learningGroup == "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี"
        );
        this.thai = this.objectData.filter(
          (data) => data.learningGroup == "กลุ่มสาระการเรียนรู้ภาษาไทย"
        );
        this.health = this.objectData.filter(
          (data) => data.learningGroup == "กลุ่มสาระการเรียนรู้สุขศึกษา"
        );
        this.social = this.objectData.filter(
          (data) => data.learningGroup == "กลุ่มสาระการเรียนรู้สังคมศึกษา"
        );
        this.art = this.objectData.filter(
          (data) => data.learningGroup == "กลุ่มสาระการเรียนรู้ศิลปะ"
        );
        this.eng = this.objectData.filter(
          (data) => data.learningGroup == "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ"
        );
        this.sci_all_budget_total = 0;
        this.mat_all_budget_total = 0;
        this.work_all_budget_total = 0;
        this.thai_all_budget_total = 0;
        this.health_all_budget_total = 0;
        this.social_all_budget_total = 0;
        this.art_all_budget_total = 0;
        this.eng_all_budget_total = 0;
        for (let i = 0; i < this.sci.length; i++) {
          this.all_budget = this.work[i]["budget"];
          // console.log(this.all_budget);
          this.sci_all_budget_total += this.all_budget;
        }

        for (let i = 0; i < this.mat.length; i++) {
          this.all_budget = this.work[i]["budget"];
          // console.log(this.all_budget);
          this.mat_all_budget_total += this.all_budget;
        }

        for (let i = 0; i < this.work.length; i++) {
          this.all_budget = this.work[i]["budget"];
          // console.log(this.all_budget);
          this.work_all_budget_total += this.all_budget;
        }

        for (let i = 0; i < this.thai.length; i++) {
          this.all_budget = this.work[i]["budget"];
          // console.log(this.all_budget);
          this.thai_all_budget_total += this.all_budget;
        }

        for (let i = 0; i < this.health.length; i++) {
          this.all_budget = this.work[i]["budget"];
          // console.log(this.all_budget);
          this.health_all_budget_total += this.all_budget;
        }

        for (let i = 0; i < this.social.length; i++) {
          this.all_budget = this.work[i]["budget"];
          // console.log(this.all_budget);
          this.social_all_budget_total += this.all_budget;
        }

        for (let i = 0; i < this.art.length; i++) {
          this.all_budget = this.work[i]["budget"];
          // console.log(this.all_budget);
          this.art_all_budget_total += this.all_budget;
        }

        for (let i = 0; i < this.eng.length; i++) {
          // console.log(this.all_budget);
          this.eng_all_budget_total += this.all_budget;
        }

        // for (let i = 0; i <   this.objectData.length; i++) {
        //   this.dataForChart = [
        //     {
        //       "name": this.objectData[i]['learningGroup'],
        //       "value": this.objectData[i]['budget']
        //     }
        //   ]  
        //   console.log(this.dataForChart);
        // }

        this.dataForChart = [
          {
            name: "วิทยาศาสตร์",
            value: this.sci_all_budget_total,
          },
          {
            name: "คณิตศาสตร์",
            value: this.mat_all_budget_total,
          },
          {
            name: "การงานอาชีพและเทคโนโลยี",
            value: this.work_all_budget_total,
          },
          {
            name: "ภาษาไทย",
            value: this.thai_all_budget_total,
          },
          {
            name: "สุขศึกษา",
            value: this.health_all_budget_total,
          },
          {
            name: "สังคมศึกษา",
            value: this.social_all_budget_total,
          },
          {
            name: "ศิลปะ",
            value: this.art_all_budget_total,
          },
          {
            name: "ภาษาต่างประเทศ",
            value: this.eng_all_budget_total,
          }
        ];
        console.log(this.dataForChart);

        // Chart
        //   this.typeChart = "pie"; // สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
        //   this.typeChart2 = "bar";
        //   this.dataChart = {
        //     labels: [
        //       "วิทยาศาสตร์",
        //       "คณิตศาสตร์",
        //       "การงานอาชีพฯ",
        //       "ภาษาไทย",
        //       "สุขศึกษาฯ",
        //       "สังคมศึกษาฯ",
        //       "ศิลปะ",
        //       "ภาษาต่างประเทศ",
        //     ],
        //     datasets: [
        //       {
        //         label: "งบประมาณรวมแต่ละกลุ่มสาระการเรียนรู้",
        //         data: [
        //           this.sci_all_budget_total,
        //           this.mat_all_budget_total,
        //           this.work_all_budget_total,
        //           this.thai_all_budget_total,
        //           this.health_all_budget_total,
        //           this.social_all_budget_total,
        //           this.art_all_budget_total,
        //           this.eng_all_budget_total,
        //         ],
        //         backgroundColor: [
        //           "#E67E22",
        //           "#E74C3C",
        //           "#9B59B6",
        //           "#F1C40F",
        //           "#2ECC71",
        //           "#F39C12",
        //           "#3498DB",
        //           "#27AE60",
        //         ],
        //       },
        //     ],
        //   };
        //   this.optionsChart = {
        //     responsive: true,
        //     maintainAspectRatio: false,
        //     pieceLabel: {
        //       render: "value", // สามารถเปลี่ยนการตั้งค่าตามต้องการได้ 'value','label','percentage'
        //       fontSize: 10,
        //       fontStyle: "bold",
        //       fontColor: "#FFF",
        //       fontFamily: '"db_heaventmed_cond"',
        //     },
        //   };
      });

    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    // Get data totable
    this.userId = this.userServices.getUserId();
    this.equipmentServices.getAllEquipments();
    this.getEquipmentsData = this.equipmentServices
      .getEquipmentUpdateListener()
      .subscribe((objectData: Equipments[]) => {
        this.equipments = objectData;
        this.document = this.equipments.filter(
          (data) => data.creator === this.userId
        );
        this.pendingEquipments = this.document.filter(
          (status) => status.status === "กำลังดำเนินการ"
        );
        this.successEquipments = this.document.filter(
          (status) => status.status === "ผ่านการอนุมัติ"
        );
        this.failedEquipments = this.document.filter(
          (status) => status.status === "ไม่ผ่านการอนุมัติ"
        );

        this.countSuccess = this.successEquipments.length;
        this.countPending = this.pendingEquipments.length;
        this.countFailed = this.failedEquipments.length;
      });
  }

  pdfGen(id: string) {
    this.exportsPDF.generatePdf(id);
  }

  setBudget() {
    const dialogSetBudget = this.dialog.open(DetailManageBudgetComponent, {
      width: "60%",
      // data: {
      //   data: this.statusDetail,
      // },
    });
  }

  moreDetail(status: any) {
    this.statusDetail = status;
    // console.log("Status : ", this.statusDetail);
    const dialogRef = this.dialog.open(MoreDetailComponent, {
      data: {
        data: this.statusDetail,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  report() {
    const reportDialog = this.dialog.open(ReportComponent, {
      width: '70%',
      data: {
        ducument: document
      }
    })
  }
  ngOnDestroy(): void {}
}
