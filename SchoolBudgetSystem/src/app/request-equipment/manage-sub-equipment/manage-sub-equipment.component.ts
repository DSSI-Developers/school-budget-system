import { UsersService } from './../../services/users.service';
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

export interface SubEquipment {
  no: number; // ลำดับ
  list: string; // รายการ
  price: number; // ราคาต่อหน่วย
  unit: number; // จำนวนหน่วย
  budget: number;
  edit: string;
  delete: string;
}

@Component({
  selector: "app-manage-sub-equipment",
  templateUrl: "./manage-sub-equipment.component.html",
  styleUrls: ["./manage-sub-equipment.component.css"],
})
export class ManageSubEquipmentComponent implements OnInit, OnDestroy {
  subEquipment: FormGroup;

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

  listOfSubProject: SubEquipment[] = [
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
  ];

  majorList;
  budget;
  necessary;

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mainEquipmentServices: EquipmentsService,
    private userServices: UsersService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
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
      const projectId = paramMap.get("listProjectId");
      console.log(projectId);
      this.mainEquipmentServices
        .getOneEquipment(projectId)
        .subscribe((listProject) => {
          this.majorList = listProject.majorList;
          this.budget = listProject.budget;
          this.necessary = listProject.necessary;
          // console.log(this.equipmentDetail);
        });
    });
  }

  addSubEupqment() {
    let index: number = 1;
    this.listOfSubProject.push(
      // tslint:disable-next-line: max-line-length
      {
        no: index + this.listOfSubProject.length,
        list: this.subEquipment.value.equipmentName,
        price: this.subEquipment.value.pricePerunit,
        unit: this.subEquipment.value.unit,
        budget: this.subEquipment.value.budget,
        edit: "edit",
        delete: "delete",
      }
    );
  }

  deleteEquipment(id: any) {
    console.log(id);
  }
  saveSubEupqment() {
    console.log(this.listOfSubProject);
  }
  daleteEquip() {
    window.confirm("ต้องการลบข้อมูลนี้หรือไม่");
  }

  ngOnDestroy() {}
}
