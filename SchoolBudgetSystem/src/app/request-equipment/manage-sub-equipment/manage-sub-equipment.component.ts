import { SubEquipments } from './../../../models/sub-equipments.model';
import { SubEquipmentsService } from './../../services/sub-equipments.service';
import { UsersService } from './../../services/users.service';
import { Equipments } from './../../../models/equipments.model';
import { Subscription } from 'rxjs';
import { EquipmentsService } from './../../services/equipments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from './../request-equipment.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var $: any;
// export interface SubEquipment {
//   no: number; // ลำดับ
//   list: string; // รายการ
//   price: number; // ราคาต่อหน่วย
//   unit: number; // จำนวนหน่วย
//   budget: number;
//   edit: string;
//   delete: string;
// }

@Component({
  selector: 'app-manage-sub-equipment',
  templateUrl: './manage-sub-equipment.component.html',
  styleUrls: ['./manage-sub-equipment.component.css'],
})
export class ManageSubEquipmentComponent implements OnInit, OnDestroy {
  subEquipment: FormGroup;

  listOfProject = [
    {
      no: '1',
      type: 'โครงการ',
      list: 'วงโยธวาทิต',
      unit: '20',
      budget: 900000,
      subEquipment: 900000,
    },
  ];

  // listOfSubProject: SubEquipment[] = [
  // {
  //   no: 1,
  //   list: this.subEquipment.value.equipment,
  //   price: this.subEquipment.value.pricePerunit,
  //   unit: this.subEquipment.value.unit,
  //   budget: this.subEquipment.value.budget,
  //   edit: 'edit',
  //   delete: 'delete'
  // }
  // {no: 1, list: 'กลองสเเนร์', price: 50000, unit: 4, budget: 200000, edit: 'edit', delete: 'delete'},
  // {no: 2, list: 'เซคโซโฟน', price: 25000, unit: 12, budget: 300000, edit: 'edit',delete: 'delete'},
  // {no: 3, list: 'กลองใหญ่', price: 50000, unit: 2, budget: 100000, edit: 'edit',delete: 'delete'},
  // {no: 4, list: 'ทอมโบน', price: 100000, unit: 3, budget: 300000, edit: 'edit',delete: 'delete'},
  // ];

  majorList: string;
  budget: number;
  necessary: number;
  majorId: string;

  isLoading = false;
  private authStatusSub: Subscription;
  allDataSubEquipment;

  subEquipmentsData;
  dataUpdate$: Subscription;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mainEquipmentServices: EquipmentsService,
    private userServices: UsersService,
    private subServices: SubEquipmentsService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.subEquipment = new FormGroup({
      equipmentName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      pricePerunit: new FormControl(null, {
        validators: [Validators.required],
      }),
      unit: new FormControl(null, { validators: [Validators.required] }),
      budget: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap) => {
      const projectId = paramMap.get('listProjectId');
      // console.log(projectId);
      this.mainEquipmentServices
        .getOneEquipment(projectId)
        .subscribe((listProject) => {
          this.majorId = listProject._id;
          this.majorList = listProject.majorList;
          this.budget = listProject.budget;
          this.necessary = listProject.necessary;
          // console.log(this.equipmentDetail);

          // Get data
          this.subServices
            .getEquipmentBySunId(listProject._id)
            .subscribe((data) => {
              this.subEquipmentsData = data.response;
              console.log(this.subEquipmentsData);
            });
        });
    });
  }

  addSubEupqment() {
    // let index: number = 1;
    // this.listOfSubProject.push(
    //   {
    //     no: index + this.listOfSubProject.length,
    //     list: this.subEquipment.value.equipmentName,
    //     price: this.subEquipment.value.pricePerunit,
    //     unit: this.subEquipment.value.unit,
    //     budget: this.subEquipment.value.budget,
    //     edit: "edit",
    //     delete: "delete",
    //   }
    // );
    this.subServices.addSubEquipments(
      this.majorId,
      this.majorList,
      this.subEquipment.value.equipmentName,
      this.subEquipment.value.pricePerunit,
      this.subEquipment.value.unit,
      this.subEquipment.value.budget
    );
    // Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: 'notifications',
        message: `เพิ่มข้อมูล <b>${this.subEquipment.value.equipmentName}</b> เรียบร้อย`,
      },
      {
        // type: type[color],
        type: type[2],
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right',
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      }
    );
  }

  deleteEquipment(id: any) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.subServices.deleteSubEquipment(id);
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
    console.log(id);
  }
  saveSubEupqment() {
    // console.log(this.listOfSubProject);
  }
  daleteEquip() {
    window.confirm('ต้องการลบข้อมูลนี้หรือไม่');
  }

  ngOnDestroy() {}
}
