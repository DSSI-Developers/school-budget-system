import { SubEquipments } from "./../../../models/sub-equipments.model";
import { SubEquipmentsService } from "./../../services/sub-equipments.service";
import { UsersService } from "./../../services/users.service";
import { Equipments } from "./../../../models/equipments.model";
import { Subscription } from "rxjs";
import { EquipmentsService } from "./../../services/equipments.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Type } from "./../request-equipment.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import Swal from "sweetalert2/dist/sweetalert2.js";

import * as io from "socket.io-client";
import { ConstantPool } from "@angular/compiler";

declare var $: any;

@Component({
  selector: "app-manage-sub-equipment",
  templateUrl: "./manage-sub-equipment.component.html",
  styleUrls: ["./manage-sub-equipment.component.css"],
})
export class ManageSubEquipmentComponent implements OnInit, OnDestroy {
  subEquipment: FormGroup;
  socket;
  listOfProject = [
    {
      no: "1",
      type: "โครงการ",
      list: "วงโยธวาทิต",
      unit: "20",
      budget: 900000,
      subEquipment: 900000,
    },
  ];

  majorList: string;
  budget: number;
  necessary: number;
  majorId: string;

  totalBudget: number;
  isLoading = false;
  projectId: string;
  totalUnitPerprice: number;
  private authStatusSub: Subscription;
  private allUpdate: Subscription;
  private subEquipmentsData: SubEquipments[] = [];

  valueOfprice: number;
  valueOfunit: number;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mainEquipmentServices: EquipmentsService,
    private userServices: UsersService,
    private subServices: SubEquipmentsService
  ) {
    // this.socket = io();
  }

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
      // budget: new FormControl(null, { validators: [Validators.required] }),
    });

    this.subEquipment.get("pricePerunit").valueChanges.subscribe((value) => {
      this.valueOfprice = value;
    });
    this.subEquipment.get("unit").valueChanges.subscribe((value) => {
      this.valueOfunit = value;
    });
    this.totalUnitPerprice = this.valueOfprice * this.valueOfunit;

    console.log(this.totalUnitPerprice);
    this.route.paramMap.subscribe((paramMap) => {
      this.projectId = paramMap.get("listProjectId");
      // console.log(projectId);
      this.mainEquipmentServices
        .getOneEquipment(this.projectId)
        .subscribe((listProject) => {
          this.majorId = listProject._id;
          this.majorList = listProject.majorList;
          this.budget = listProject.budget;
          this.necessary = listProject.necessary;
          // console.log(this.equipmentDetail);

          // update listen
          // this.subServices.getAllSubEquipments();
          // this.allUpdate = this.subServices
          //   .subEquipmentListenUpdate()
          //   .subscribe((dataUpdate: SubEquipments[]) => {
          //     this.subEquipmentsData = dataUpdate;
          //     console.log('Data listen : ', dataUpdate);
          //   });

          // Get data
          this.totalBudget = 0;
          this.subServices.getEquipmentBySunId(listProject._id);
          console.log(this.subServices);
          this.allUpdate = this.subServices
            .subEquipmentListenUpdate()
            .subscribe((data: SubEquipments[]) => {
              this.subEquipmentsData = data;

              // นับราคารวม
              for (let i = 0; i < this.subEquipmentsData.length; i++) {
                console.log(
                  "ราคาแต่ละหน่วย :",
                  this.subEquipmentsData[i]["budget"]
                );
                // this.totalBudget += this.subEquipmentsData[i]["budget"];
              }
              console.log("ราคารวม : ", this.totalBudget);
            });
        });
    });
  }

  addSubEupqment() {
    console.log("ราคารวม function add :", this.totalBudget);
    console.log("ราคาครุภัณฑ์หลัก :", this.budget);
    this.totalUnitPerprice = this.subEquipment.value.pricePerunit * this.subEquipment.value.unit;
    if (this.totalUnitPerprice > this.budget) {
      console.log(this.totalBudget);
      Swal.fire("ราคาครุภัณฑ์รองเกินราคาที่ตั้งไว้ !");
    } else {
      this.totalBudget += this.totalUnitPerprice;
      this.subServices.addSubEquipments(
        this.majorId,
        this.majorList,
        this.subEquipment.value.equipmentName,
        this.subEquipment.value.pricePerunit,
        this.subEquipment.value.unit,
        this.totalUnitPerprice
      );
      // Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
      const type = ["", "info", "success", "warning", "danger"];
      const color = Math.floor(Math.random() * 4 + 1);

      $.notify(
        {
          icon: "notifications",
          message: `เพิ่มข้อมูล <b>${this.subEquipment.value.equipmentName}</b> เรียบร้อย`,
        },
        {
          // type: type[color],
          type: type[2],
          timer: 2000,
          placement: {
            from: "top",
            align: "right",
          },
          template:
            '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            "</div>" +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            "</div>",
        }
      );
      this.subEquipment.reset();
      this.subServices.getEquipmentBySunId(this.projectId);
    }
  }

  deleteEquipment(id: any, price: number) {
    this.totalBudget = this.totalBudget - price;
    console.log(this.totalBudget);
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.subServices.deleteSubEquipment(id);
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
    console.log(id);
  }
  saveSubEupqment() {
    // console.log(this.listOfSubProject);
  }
  daleteEquip() {
    window.confirm("ต้องการลบข้อมูลนี้หรือไม่");
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.allUpdate.unsubscribe();
  }
}
