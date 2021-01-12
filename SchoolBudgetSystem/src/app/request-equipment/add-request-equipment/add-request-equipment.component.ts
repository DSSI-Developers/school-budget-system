import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import { MomentDateAdapter } from "@angular/material-moment-adapter";
import * as moment from "moment";
import { AngularEditorConfig } from '@kolkov/angular-editor';

export interface Type {
  value: string;
  valueView: string;
}

@Component({
  selector: "app-add-request-equipment",
  templateUrl: "./add-request-equipment.component.html",
  styleUrls: ["./add-request-equipment.component.css"],
})
export class AddRequestEquipmentComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());


  // Initialized to specific date (09.10.2018).
  private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  typeOfProject: Type[] = [
    { value: "ครุภัณฑ์การศึกษา", valueView: "ครุภัณฑ์การศึกษา" },
    { value: "โครงการ", valueView: "โครงการ" },
  ];

  learningGroup: Type[] = [
    {
      value: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
      valueView: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
      valueView: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
      valueView: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
    },
    { value: "กลุ่มสาระการเรียนรู้", 
      valueView: "กลุ่มสาระการเรียนรู้ภาษาไทย" },
    {
      value: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
      valueView: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
    },
    {
      value: "กลุ่มสาระการเรียนรู้",
      valueView: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ศิลปะ",
      valueView: "กลุ่มสาระการเรียนรู้ศิลปะ",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
      valueView: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
    },
  ];

  // Equipments รายการคำร้องจัดตั้งครุภัณฑ์
  equipmentsRequest = this.fb.group({
    responPerson: this.fb.group({
      firstName: ["กฤษณะ"],
      lastName: ["ประสิทธิ์"],
      position: ["ศาสตราจารย์"],
      learningGroup: ["เทพเจ้า"],
      subjectTeach: ["คอมพิวเตอร์"],
    }),
    data: this.fb.group({
      reasons: [""],
      objective: [""],
    }),
    requestBudget: this.fb.group({
      typeEquipment: [""],
      learningGroups: [""],
      majorList: [""],
      budget: [""],
    }),
    otherData: this.fb.group({
      necessary: [""],
      existEquipment: [""],
      otherReason: [""],
      dateProject: [""],
      condition: [""],
    }),

    // firstName: ['กฤษณะ'],
    // lastName: ['ประสิทธิ์'],
    // position: ['ครู'],
    // learningGroup: ['กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยีสารสนเทศ'],
    // subjectTeach: ['คอมพิวเตอร์'],
    // reasons: [''],
    // objective: [''],
    // typeEquipment: [''],
    // learningGroups: [''],
    // majorList: [''],
    // budget: [''],
    // necessary: [''],
    // existEquipment: [''],
    // otherReason: [''],
    // dateProject: [''],
    // condition: ['']
  });


  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {}

  addData() {
    // if(this.equipmentsRequest.valid) return;
    const data =  this.equipmentsRequest.value;
    this.equipmentsRequest.value.responPerson.firstName;
    this.equipmentsRequest.value.responPerson.lastName;
    this.equipmentsRequest.value.responPerson.position;
    this.equipmentsRequest.value.responPerson.learningGroup;
    this.equipmentsRequest.value.responPerson.subjectTeach;

    this.equipmentsRequest.value.data.reason;
    this.equipmentsRequest.value.data.objective;

    this.equipmentsRequest.value.requestBudget.typeEquipment;
    this.equipmentsRequest.value.requestBudget.learningGroups;
    this.equipmentsRequest.value.requestBudget.majorList;
    this.equipmentsRequest.value.requestBudget.budget;

    this.equipmentsRequest.value.otherData.neccessay;
    this.equipmentsRequest.value.otherData.existEquipment;
    this.equipmentsRequest.value.otherData.otherReason;
    this.equipmentsRequest.value.otherData.dataProject;
    this.equipmentsRequest.value.otherData.condition;


    console.log(data);
  }


  logData() {}
}
