import { FormGroup, FormControl , Validators} from '@angular/forms';
import { EquipmentsService } from './../../services/equipments.service';
import { Equipments } from './../../../models/equipments.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'app/services/users.service';
import { Subscription } from 'rxjs';
import { param } from 'jquery';

@Component({
  selector: 'app-read-detail-form',
  templateUrl: './read-detail-form.component.html',
  styleUrls: ['./read-detail-form.component.css']
})
export class ReadDetailFormComponent implements OnInit {
  listOfProject = [
    {no: '1', type: 'โครงการ', list: 'วงโยธวาทิต', unit: '20', budget: 900000, subEquipment: 900000}
  ]

  listOfSubProject = [
    {no: 1, list: 'กลองสเเนร์', price: 50000, unit: 4, budget: 200000, edit: 'edit', delete: 'delete'},
    {no: 2, list: 'เซคโซโฟน', price: 25000, unit: 12, budget: 300000, edit: 'edit',delete: 'delete'},
    {no: 3, list: 'กลองใหญ่', price: 50000, unit: 2, budget: 100000, edit: 'edit',delete: 'delete'},
    {no: 4, list: 'ทอมโบน', price: 100000, unit: 3, budget: 300000, edit: 'edit',delete: 'delete'},
  ];
  dataDetail;
  isLoading = false;
  private authStatusSub: Subscription;

  budget;
  condition;
  dateProject;
  existEquipment;
  firstName;
  lastName;
  learningGroup;
  learningGroups;
  majorList;
  necessary;
  objective;
  otherReason;
  position;
  reason;
  status;
  subjectTeach;

  conditionValue: FormGroup;
  // personalData
  userId;
  fetchFirstName;
  fetchLastName;
  fetchEmail;
  fetchPhone;
  fetchPosition;
  fetchAvatar
  constructor(private userServices: UsersService, private  router: ActivatedRoute, private equipmentService: EquipmentsService) { }

  ngOnInit(): void {
    this.conditionValue = new FormGroup({
      condition: new FormControl(null, {validators: []})
    });
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });

    // Section user detail
    const userId = this.userServices.getUserId();
    this.userServices.getUserDetail(userId).subscribe(data => {
      this.fetchFirstName = data.data.firstName;
      this.fetchLastName = data.data.lastName;
      console.log(this.fetchFirstName + ' ' + this.fetchLastName);
    });

    // Section fetch data of Project | Equipment
    this.router.paramMap.subscribe(paramMap => {
      const equipmentId = paramMap.get('equipmentId');
      this.equipmentService.getOneEquipment(equipmentId)
      .subscribe((data) => {
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
          condition: this.dataDetail.condition
        });
        console.log(this.dataDetail);
      });
    });


  }

}
