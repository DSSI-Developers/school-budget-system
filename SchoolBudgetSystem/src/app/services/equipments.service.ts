import { Router } from '@angular/router';
import { Equipments } from './../../models/equipments.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentsService {
  private equipments: Equipments[] = [];
  private equipmentUpdated = new Subject<Equipments[]>();

  constructor(private _http: HttpClient, private router: Router) {}

  getAllEquipments() {
    // เพิ่ม User ID ด้วย
    return this._http.get<{ data: any }>(
      'http://localhost:8080/mainEquipment/getAllEquipments'
    ).subscribe((data) => {
      console.log(data);
      this.equipments = data.data;
      this.equipmentUpdated.next([...this.equipments]);
    });
  }

  getOneEquipment(equipmentsId: string) {
    return this._http.get<{
      _id: string,
      firstName: string,
      lastName: string,
      position: string,
      learningGroup: string,
      subjectTeach: string,
      reason: string,
      objective: string,
      typeEquipments: string,
      learningGroups: string,
      majorList: string,
      budget: number,
      necessary: number,
      existEquipment: number,
      otherReason: string,
      dateProject: Date,
      condition: string,
      status: string
    }>(
      'http://localhost:8080/mainEquipment/getOneEquipment/' + equipmentsId
    );
  }

  // Function update equipments
  // จะคอบรับค่าตลอด สังเกตจากการใช้งาน equipmentUpdated ที่เราใช้เป็น Subject . ด้วย asObservable เพื่อสังเกตค่า
  getEquipmentUpdateListener() {
    return this.equipmentUpdated.asObservable();
  }

  // Filter equipment id to show
  // จะเอาข้อมูล Equipment ทั้งหมด มาหา ID ที่ตรงกัน เเล้ว return กลับ
  getEquipment(id: string) {
    return this._http.get<{message: string, data: any }>('http://localhost:8080/mainEquipment/getAllEquipments');
    // return { ...this.equipments.find((data) => data._id === id) };
  }

  addEquipment(
    firstName: string,
    lastName: string,
    position: string,
    learningGroup: string,
    subjectTeach: string,
    reason: string,
    objective: string,
    typeEquipment: string,
    learningGroups: string,
    majorList: string,
    budget: number,
    necessary: number,
    existEquipment: number,
    otherReason: string,
    dateProject: Date,
    condition: string
  ) {
    const equipment = {
      id: null,
      firstName: firstName,
      lastName: lastName,
      position: position,
      learningGroup: learningGroup,
      subjectTeach: subjectTeach,
      reason: reason,
      objective: objective,
      typeEquipments: typeEquipment,
      learningGroups: learningGroups,
      majorList: majorList,
      budget: budget,
      necessary: necessary,
      existEquipment: existEquipment,
      otherReason: otherReason,
      dateProject: dateProject,
      condition: condition,
      status: 'กำลังดำเนินการ',
    };
    this._http
      .post<{ message: string; equipmentId: string }>(
        'http://localhost:8080/mainEquipment/addEquipment',
        equipment
      )
      .subscribe((responseData) => {
        const message = 'Success';
        this.router.navigate(['/requestEquipment']);
      });
  }

  editEquipment(
    id: string,
    firstName: string,
    lastName: string,
    position: string,
    learningGroup: string,
    subjectTeach: string,
    reason: string,
    objective: string,
    typeEquipment: string,
    learningGroups: string,
    majorList: string,
    budget: number,
    necessary: number,
    existEquipment: number,
    otherReason: string,
    dateProject: Date,
    condition: string
  ) {
    const equipment = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      position: position,
      learningGroup: learningGroup,
      subjectTeach: subjectTeach,
      reason: reason,
      objective: objective,
      typeEquipments: typeEquipment,
      learningGroups: learningGroups,
      majorList: majorList,
      budget: budget,
      necessary: necessary,
      existEquipment: existEquipment,
      otherReason: otherReason,
      dateProject: dateProject,
      condition: condition,
      status: 'กำลังดำเนินการ',
    };
    this._http
      .put<{ message: string; equipmentId: string }>(
        'http://localhost:8080/mainEquipment/editEquipment/' + id,
        equipment
      )
      .subscribe((responseData) => {
        const message = 'Success';
        console.log('Edit data success');
        this.router.navigate(['/requestEquipment']);
      });
  }

  deleteEquipment(equipmentId: string) {
    this._http
      .delete(
        'http://localhost:8080/mainEquipment/deleteEquipment/' + equipmentId
      )
      .subscribe(() => {
        console.log('Delete successful');
        const updateEquipments = this.equipments.filter((data) => data._id !== equipmentId);
        this.equipments = updateEquipments;
        this.equipmentUpdated.next([...this.equipments]);
      });
  }

  deleteAllEquipments() {}
}
