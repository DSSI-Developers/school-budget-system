import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubEquipments } from './../../models/sub-equipments.model';

import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class SubEquipmentsService {
  private subEquipments: SubEquipments[] = [];
  private subEquipmentUpdate = new Subject<SubEquipments[]>();

  socket: any;
  uri: string = 'http://localhost:8080/subEquipment/getAllSubEquip';
  constructor(private http: HttpClient, public router: Router) {
    // this.socket = io(this.uri);
  }

  getEquipmentBySunId(mainId: string) {
    return this.http
      .get<{ message: string; response: any }>(
        'http://localhost:8080/subEquipment/getSubId/' + mainId
      )
      .subscribe((subEquipments) => {
        this.subEquipments = subEquipments.response;
        this.subEquipmentUpdate.next([...this.subEquipments]);
      });
  }

  subEquipmentListenUpdate() {
    return this.subEquipmentUpdate.asObservable();
  }

  getSubEquipment(id: string) {
    // return { ...this.subEquipments.filter((data) => data._id === id) };
    return this.http
      .get<{ message: string; response: any }>(
        'http://localhost:8080/subEquipment/getSubId/' + id
      );
  }

  getAllSubEquipments() {
    return this.http
      .get<{ message: string; response: any }>(
        'http://localhost:8080/subEquipment/getAllSubEquip'
      )
      .subscribe((subEquipments) => {
        this.subEquipments = subEquipments.response;
      });
  }

  getOneSubEquipment(id: string) {}

  addSubEquipments(
    mainId: string,
    mainEquipmentsName: string,
    subEquipmentName: string,
    pricePerunit: string,
    number: number,
    budget: number
  ) {
    const subEquipment = {
      mainId: mainId,
      mainEquipmentsName: mainEquipmentsName,
      subEquipmentName: subEquipmentName,
      pricePerunit: pricePerunit,
      number: number,
      budget: budget,
    };
    this.http
      .post<{ message: string; response: any }>(
        'http://localhost:8080/subEquipment/addSubEquipment',
        subEquipment
      )
      .subscribe((response) => {
        console.log('This is response : ', response);
      });
    // console.log(`Data of sub equipment :${mainId}, ${mainEquipmentsName} ,${subEquipmentName},${pricePerunit},${number}, ${budget}`);
  }

  editSubEQuipment(
    id: string,
    subEquipmentName: string,
    pricePerunit: string,
    number: number,
    budget: number
  ) {}

  deleteSubEquipment(id: string) {
    // console.log('Delete data at id : ' + id);
    this.http
      .delete('http://localhost:8080/subEquipment/deleteSubEquipment/' + id)
      .subscribe(() => {
        console.log('Delete Successful!');
        const updateSubEquipment = this.subEquipments.filter(
          (data) => data._id !== id)
        this.subEquipments =  updateSubEquipment;
        this.subEquipmentUpdate.next([...this.subEquipments]);
      });
  }
}
