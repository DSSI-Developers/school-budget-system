import { SubEquipments } from './../../../models/sub-equipments.model';
import { SubEquipmentsService } from './../../services/sub-equipments.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EquipmentsService } from "./../../services/equipments.service";
import { Equipments } from "./../../../models/equipments.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "app/services/users.service";
import { Subscription } from "rxjs";
import { param } from "jquery";

@Component({
  selector: "app-read-detail-form",
  templateUrl: "./read-detail-form.component.html",
  styleUrls: ["./read-detail-form.component.css"],
})
export class ReadDetailFormComponent implements OnInit {
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

  
  dataDetail;
  isLoading = false;
  private authStatusSub: Subscription;

  budget; number;
  condition: string;
  dateProject;
  existEquipment;
  firstName: string;
  lastName: string;
  learningGroup: string;
  learningGroups: string;
  majorList: string;
  necessary: number;
  objective;
  otherReason;
  position;
  reason;
  status: string;
  subjectTeach: string;

  conditionValue: FormGroup;
  // personalData
  userId;
  fetchFirstName;
  fetchLastName;
  fetchEmail;
  fetchPhone;
  fetchPosition;
  fetchAvatar;

  equipmentId: string;
  subequipment_group: Subscription;
  subEquipmentList: SubEquipments[] = []

  formApprove: FormGroup;
  typeEquipment: string;
  constructor(
    private userServices: UsersService,
    private router: ActivatedRoute,
    private equipmentService: EquipmentsService,
    private subServices: SubEquipmentsService
  ) {}

  ngOnInit(): void {
    this.formApprove = new FormGroup({
      approveCondition : new FormControl(null),
      approveReason: new FormControl(null),
    })
    this.conditionValue = new FormGroup({
      condition: new FormControl(null, { validators: [] }),
    });
    this.authStatusSub = this.userServices
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    // Section user detail
    const userId = this.userServices.getUserId();
    this.userServices.getUserDetail(userId).subscribe((data) => {
      this.fetchFirstName = data.data.firstName;
      this.fetchLastName = data.data.lastName;
      console.log(this.fetchFirstName + " " + this.fetchLastName);
    });

    // Section fetch data of Project | Equipment
    this.router.paramMap.subscribe((paramMap) => {
      const equipmentId = paramMap.get("equipmentId");
      this.equipmentService.getOneEquipment(equipmentId).subscribe((data) => {
        this.equipmentId = data._id;
        this.dataDetail = data;
        this.budget = data.budget;
        this.condition = data.condition;
        this.dateProject = data.dateProject;
        this.existEquipment = data.existEquipment;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.learningGroup = data.learningGroup;
        this.learningGroups = data.learningGroups;
        this.majorList = data.majorList;
        this.necessary = data.necessary;
        this.objective = data.objective;
        this.otherReason = data.otherReason;
        this.position = data.position;
        this.reason = data.reason;
        this.status = data.status;
        this.subjectTeach = data.subjectTeach;

        this.conditionValue.setValue({
          condition: this.dataDetail.condition,
        });
        this.subServices.getEquipmentBySunId(this.equipmentId);
        this.subequipment_group = this.subServices.subEquipmentListenUpdate().subscribe((value: SubEquipments[]) => {
          this.subEquipmentList = value;
          console.log('Sub Equipment : ', this.subEquipmentList);
        });
        console.log(this.dataDetail);
      });
    });
  }

  approveProject() {
    if (this.formApprove.value.approveCondition === 'อนุมัติเห็นชอบโครงการนี้') {
      this.status = 'สำเร็จ';
    } else {
      this.status  = 'ไม่สำเร็จ';
    }
    this.equipmentService.editEquipment(
      this.equipmentId,
      this.firstName,
      this.lastName,
      this.position,
      this.learningGroup,
      this.subjectTeach,
      this.reason,
      this.objective,
      this.typeEquipment,
      this.learningGroups,
      this.majorList,
      this.budget,
      this.necessary,
      this.existEquipment,
      this.otherReason,
      this.dateProject,
      this.condition,
      this.status,
      this.formApprove.value.approveCondition,
      this.formApprove.value.approveReason
    );
  }
}
