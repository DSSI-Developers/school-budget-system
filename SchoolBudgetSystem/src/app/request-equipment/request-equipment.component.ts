import { SubEquipments } from './../../models/sub-equipments.model';
import { UsersService } from './../services/users.service';
import { EquipmentsService } from './../services/equipments.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Equipments } from './../../models/equipments.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubEquipmentsService } from './../services/sub-equipments.service';
import {PageEvent} from '@angular/material/paginator';



import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SetBudgetService } from '../services/set-budget.service';
declare var count: number;
export interface Type {
  value: string;
  valueView: string;
}
@Component({
  selector: 'app-request-equipment',
  templateUrl: './request-equipment.component.html',
  styleUrls: ['./request-equipment.component.css'],
})
export class RequestEquipmentComponent implements OnInit, OnDestroy {
        // typeOfProject: Type[] = [
        //   { value: 'ครุภัณฑ์การศึกษา', valueView: 'ครุภัณฑ์การศึกษา' },
        //   { value: 'โครงการ', valueView: 'โครงการ' },
        // ];
        equipments: Equipments[] = [];
        // equipments;
        document;
        private allEquipment$: Subscription;

        isLoading = false;
        private authStatusSub: Subscription;
        idForCheck: string;
        userId: string;
        // countDataInSubEquipment;
        // alert: string;
        countDataInSubEquipment: Array<number> = [];
        dataSub;

        // totalPosts = 0;
        postsPerPage = 2;
        currentPage = 1;
        pageSizeOptions = [1, 2, 5, 10];

        subEquipment: SubEquipments[] = [];
  approved: Equipments[];
  dataOfSubEQ: Subscription;
  amount: any;
  totalAmount: number;
  department: any;
  setBudgetDetail: any;
  // document: Equipments[] = [];
  constructor(
    private equipmentsService: EquipmentsService,
    private route: ActivatedRoute,
    private subEquipmentsService: SubEquipmentsService,
    private userServices: UsersService,
    private subServices: SubEquipmentsService,
    private setBudgetService: SetBudgetService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });

    this.userId = this.userServices.getUserId();
    this.userServices.getUserDetail(this.userId).subscribe(userData => {
      this.department = userData.data['department'];
      this.setBudgetService.getDataBudget().subscribe(dataBudget => {
        const detailOfSetBG = dataBudget.data;
        this.setBudgetDetail = detailOfSetBG.filter(data => data.learningGroup === this.department);
        console.log(this.setBudgetDetail);
      });
    });

    console.log('User ID :', this.userId);

    this.equipmentsService.getAllEquipments();
    // this.equipmentsService.getAllEquipmentsByPag(this.postsPerPage, this.currentPage);

    this.allEquipment$ = this.equipmentsService
      .getEquipmentUpdateListener()
      .subscribe((equipments: Equipments[]) => {
        this.equipments = equipments;
        this.approved = this.equipments.filter(approve => approve.approveCondition !== 'อนุมัติเห็นชอบโครงการนี้');
        // console.log(this.approved);
        this.document = this.approved.filter(data => data.creator === this.userId)
        // Count sub equipment in for loop
        for (let i = 0; i < this.document.length; i++) {
          console.log('Documents : ', this.document[i]['_id']);
          this.idForCheck = this.document[i]['_id'];
          this.subServices.getSubEquipment(this.idForCheck).subscribe((value) => {
            console.log('Sub equipment : ', value.response);
            this.countDataInSubEquipment.push(value.response.length);
            // this.countDataInSubEquipment = value.response.length;
            console.log('Count sub equipment : ', this.countDataInSubEquipment);
          });
        }
        const mainEquipment = this.equipments.filter(mainList => mainList.creator === this.userId && mainList.status !== "ผ่านการอนุมัติ");
        console.log(mainEquipment[0]['_id']);
        const mainId = mainEquipment[0]['_id'];
        this.totalAmount = 0;
        this.subServices.getSubEquipment(mainId).subscribe(data => {
          const allDataOfSub = data.response;
          console.log(allDataOfSub);
          for (let i = 0; i < allDataOfSub.length; i++) {
            // console.log(allDataOfSub[i]['unit']);
            this.totalAmount += allDataOfSub[i]['unit'];
          }
          console.log(this.totalAmount);
        });
        // console.log(this.dataOfSubEQ);
        // this.filterSub = this.dataOfSubEQ.filter(data =>);
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.equipmentsService.getAllEquipmentsByPag(this.postsPerPage, this.currentPage);
  }

  manageSubQuipments() {}

  deleteEquipment(equipmentId: string) {
    console.log(equipmentId);
    Swal.fire({
      title: 'คุณต้องการยืนยัการลบรายการนี้หรือไม่ ?',
      text: 'หากข้อมูลถุกลบไปเเล้วจะไม่สามารถนำกลับมาได้ !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.value) {
        this.equipmentsService.deleteEquipment(equipmentId);
        Swal.fire(
          'ยืนยันการลบ!',
          'ลบรายการเรียบร้อยเเล้ว',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('ยกเลิกการลบเรียบร้อย', '', 'error');
      }
    });
    // const confirm = window.confirm('ต้องการลบข้อมูลหรือไม่');
    // if (confirm === true) {
    //   this.equipmentsService.deleteEquipment(equipmentId);
    // } else {
    //   window.alert('บักขี้ตั๋ว');
    // }
  }
  ngOnDestroy(): void {
    this.allEquipment$.unsubscribe();
  }
}
