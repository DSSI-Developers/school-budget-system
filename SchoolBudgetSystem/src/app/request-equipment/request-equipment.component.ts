import { SubEquipments } from './../../models/sub-equipments.model';
import { UsersService } from './../services/users.service';
import { EquipmentsService } from './../services/equipments.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Equipments } from './../../models/equipments.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubEquipmentsService } from './../services/sub-equipments.service';



import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  // listOfProject = [
  //   {
  //     no: '1',
  //     type: 'โครงการ',
  //     list: 'เด็กดีมีคุณธรรม',
  //     unit: '20',
  //     budget: '20000',
  //     note: ' ',
  //     subEquipment: '',
  //   },
  //   {
  //     no: '2',
  //     type: 'ครุภัณฑ์',
  //     list: 'การ์ดจอ RTX 8080',
  //     unit: '10',
  //     budget: '1000000',
  //     note: 'คำขอไม่สมบูรณ์',
  //     subEquipment: '',
  //   },
  // ];
  typeOfProject: Type[] = [
    { value: 'ครุภัณฑ์การศึกษา', valueView: 'ครุภัณฑ์การศึกษา' },
    { value: 'โครงการ', valueView: 'โครงการ' },
  ];
  equipments: Equipments[] = [];
  // equipments;
  document;
  private allEquipment$: Subscription;

  isLoading = false;
  private authStatusSub: Subscription;
  idForCheck: string;
  userId: string;
  countDataInSubEquipment: string;
  // document: Equipments[] = [];
  constructor(
    private equipmentsService: EquipmentsService,
    private route: ActivatedRoute,
    private subEquipmentsService: SubEquipmentsService,
    private userServices: UsersService,
    private subServices: SubEquipmentsService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });

    this.userId = this.userServices.getUserId();
    console.log('User ID :', this.userId);

    this.equipmentsService.getAllEquipments();
    this.allEquipment$ = this.equipmentsService
      .getEquipmentUpdateListener()
      .subscribe((equipments: Equipments[]) => {
        this.equipments = equipments;
        // console.log('Equipments :', this.equipments);
        this.document = this.equipments.filter(data => data.creator === this.userId)
        // console.log('Creator Id:', this.equipments.filter(data => data.creator === this.userId));
        for (let i = 0; i < this.document.length; i++) {
          console.log('Documents : ', this.document[i]['_id']);
          this.idForCheck = this.document[i]['_id'];

          this.subServices.getSubEquipment(this.idForCheck).subscribe((value) => {
            console.log(value.response);
            this.countDataInSubEquipment = value.response.length;
          });
          if (this.countDataInSubEquipment) {

          }
          // break;
        }
        // console.log('Id for check is :', this.idForCheck);
      });
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
